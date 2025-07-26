# 🛍️ Kharido PK – Modern E-Commerce Platform

*A full-stack e-commerce application built with Next.js and Supabase, designed to deliver a fast, secure, and intuitive shopping experience.*

![Kharido PK Preview](screenshots/preview.png) *(Replace with actual screenshot)*

## 🌐 **Live Demo**
**[Visit Kharido PK →](https://kharido-pk.vercel.app)**

---

## ✅ **Why Kharido PK?**

- **Modern Tech Stack** – Built with Next.js for speed and SEO optimization.
- **Role-Based Access Control** – Only verified admins can list products.
- **Secure Authentication** – Powered by Supabase Auth.
- **Mobile-First Design** – Fully responsive for all devices.
- **Optimized UX** – Simple, clean, and user-friendly interface.

---

## ✨ **Key Features**

- **Restricted Seller System**: Only authorized admins can list products, ensuring quality control and trustworthiness.
- **Secure Shopping**: Complete authentication system with user profiles.
- **Product Management**: Admin dashboard for product listing and management.
- **Shopping Cart**: Add to cart and checkout functionality.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.

---

## 🛠️ **Tech Stack**

- **Frontend**: Next.js, Tailwind CSS, Shadcn/UI
- **Backend & Database**: Supabase (PostgreSQL + Auth)
- **Deployment**: Vercel

---

## 🚀 **Getting Started**

### **1. Clone the Repository**
```bash
git clone https://github.com/hamxashaukat/kharido-pk.git
cd kharido-pk
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Environment Variables**
Create a `.env.local` file in the root directory and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_BASE_URL=https://kharido-pk.vercel.app
NEXT_PUBLIC_ADMIN_EMAILS=abc@abc.com,def@def.com,xyz@xyz.com // just example you can set your own
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

#### 🔑 **How to Get These Keys**
- **Supabase URL & Anon Key**:
  - Create a project on [Supabase](https://supabase.com)
  - Go to Settings → API to find your URL and anon key
- **Service Role Key**:
  - Found in the same API settings page
  - ⚠️ **Security Note**: Never expose `SUPABASE_SERVICE_ROLE_KEY` on the client
- **Admin Emails**:
  - Add comma-separated email addresses of users who should have admin access

### **4. Run the Development Server**
```bash
npm run dev
```
Visit `http://localhost:3000` to view the app.

---

## 🔐 **Role-Based Access Control**

- **Admin Users** (emails in `NEXT_PUBLIC_ADMIN_EMAILS`):
  - Add & manage products
  - Access admin dashboard
  - Full product control

- **Regular Users**:
  - Browse products
  - Add to cart & checkout
  - Manage user profile

---

## 📸 **Screenshots**

| Homepage | Product Details | Admin Dashboard |
|----------|----------------|-----------------|
| ![Homepage](screenshots/home.png) | ![Product](screenshots/product.png) | ![Admin](screenshots/admin.png) |

---

## 🚀 **Deployment**

The app is deployed on **Vercel** for production-ready performance:

```bash
npm run build
npm start
```

For deployment on Vercel:
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push

---

## 💡 **Challenges & Solutions**

- **Challenge**: Implementing secure admin-only product management.
  **Solution**: Created role-based middleware using Supabase RLS policies and email verification.

- **Challenge**: Optimizing for mobile commerce experience.
  **Solution**: Implemented mobile-first design with Tailwind CSS responsive utilities.

---

## 🛑 **Future Improvements**

- [ ] **Payment Integration**: Add Stripe/PayPal checkout, Currently only cash on delivery is supported
- [ ] **Reviews System**: Customer product reviews and ratings
- [ ] **Inventory Management**: Stock tracking and alerts

---

## 📜 **License**
MIT

## 📩 **Contact**
💡 **Want to contribute?** Fork the repo.

Email: **hamzashaukat714@gmail.com** | LinkedIn: [Hamza Shaukat](https://www.linkedin.com/in/hamxa-shaukat/)
