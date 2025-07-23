import axios from "axios";

export async function GetUserData(id: string) {
  try {
    const response = await axios.post("/api/user-info", {
      userId: id,
    });

    if (response.status !== 200) {
      throw new Error("User not found");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}
