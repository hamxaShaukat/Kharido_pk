import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });
  console.log("🟢 [utils/middleware] updateSession called");
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const all = request.cookies.getAll();
          console.log("🔵  [utils/middleware] Cookies retrieved:", all);
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          console.log(
            "🟠  [utils/middleware] Cookies to set:",
            cookiesToSet
          );
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>{
            console.log(
              `☂️ [utils/middleware] Setting cookie: ${name}=${value}, options: ${JSON.stringify(options)}`
            );
             console.log(`🟡 [utils/middleware] Setting cookie on response: ${name}`);
            supabaseResponse.cookies.set(name, value, options)}
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();
   console.log("🧠 [utils/middleware] supabase.auth.getUser:", user);

  if (!user && !request.nextUrl.pathname.startsWith("/login")) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    console.log("🔴 [utils/middleware] No user found, redirecting to /login");
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!
  console.log("✅ [utils/middleware] Returning supabaseResponse");
  return supabaseResponse;
}
