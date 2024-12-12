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

const UserService = {
  getAllUsers,
  loginUser,
};

export default UserService;
