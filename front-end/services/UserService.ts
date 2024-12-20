import { User } from "@/types";

const getAuthToken = () => {
  const token = localStorage.getItem("token");
  console.log("Retrieved token:", token);
  return token;
};

const getAllUsers = () => {
  const token = getAuthToken();

  // const token = JSON.parse(sessionStorage.getItem("loggedInUser"))?.token;
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const loginUser = (user: User) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

const registerUser = (user: User) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

const getUserByUsername = (username: string) => {
  const token = getAuthToken();

  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/username/${username}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const deleteUser = async (id: number) => {
  const token = getAuthToken();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete review");
    }

    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const UserService = {
  getAllUsers,
  loginUser,
  registerUser,
  getUserByUsername,
  deleteUser,
};

export default UserService;
