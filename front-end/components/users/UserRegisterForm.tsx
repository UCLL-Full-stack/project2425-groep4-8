import UserService from "@/services/UserService";
import { StatusMessage } from "@/types";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { receiveMessageOnPort } from "worker_threads";

const UserRegisterForm: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("user"); // Default role set to 'user'

  const [nameError, setNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);

  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();

  const clearErrors = () => {
    setNameError(null);
    setPasswordError(null);
    setEmailError(null);
    setFirstNameError(null);
    setLastNameError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!name || name.trim() === "") {
      setNameError("Username is required");
      result = false;
    }

    if (!password || password.trim() === "") {
      setPasswordError("Password is required");
      result = false;
    }

    if (!email || email.trim() === "") {
      setEmailError("Email is required");
      result = false;
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setEmailError("Invalid email format");
      result = false;
    }

    if (!firstName || firstName.trim() === "") {
      setFirstNameError("First name is required");
      result = false;
    }

    if (!lastName || lastName.trim() === "") {
      setLastNameError("Last name is required");
      result = false;
    }

    return result;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    clearErrors();

    if (!validate()) {
      return;
    }

    const user = { username: name, password, email, firstName, lastName, role };
    console.log(user);

    const response = await UserService.registerUser(user);
    console.log(response);
    if (response.status === 201) {
      setStatusMessages([
        {
          message: `Register successful!`,
          type: "success",
        },
      ]);

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      const errorData = await response.json();
      setStatusMessages([
        {
          message:
            errorData?.message || `Registration failed. Please try again.`,
          type: "error",
        },
      ]);
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <h3 className="px-0">Register</h3>
      {statusMessages && (
        <div className="row">
          <ul className="list-none mb-3 mx-auto">
            {statusMessages.map(({ message, type }, index) => (
              <li
                key={index}
                className={classNames({
                  "text-red-800": type === "error",
                  "text-green-800": type === "success",
                })}
              >
                {message}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="nameInput" className="block mb-2 text-sm font-medium">
          Username:
        </label>
        <input
          id="nameInput"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        {nameError && <div className="text-red-800">{nameError}</div>}

        <label htmlFor="emailInput" className="block mb-2 text-sm font-medium">
          Email:
        </label>
        <input
          id="emailInput"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        {emailError && <div className="text-red-800">{emailError}</div>}

        <label
          htmlFor="firstNameInput"
          className="block mb-2 text-sm font-medium"
        >
          First Name:
        </label>
        <input
          id="firstNameInput"
          type="text"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        {firstNameError && <div className="text-red-800">{firstNameError}</div>}

        <label
          htmlFor="lastNameInput"
          className="block mb-2 text-sm font-medium"
        >
          Last Name:
        </label>
        <input
          id="lastNameInput"
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        {lastNameError && <div className="text-red-800">{lastNameError}</div>}

        <label htmlFor="roleInput" className="block mb-2 text-sm font-medium">
          Role:
        </label>
        <select
          id="roleInput"
          value={role}
          onChange={(event) => setRole(event.target.value)}
          className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="user">User</option>
          <option value="chef">Chef</option>
          <option value="admin">Admin</option>
        </select>

        <label
          htmlFor="passwordInput"
          className="block mt-4 mb-2 text-sm font-medium"
        >
          Password:
        </label>
        <input
          id="passwordInput"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        {passwordError && <div className="text-red-800">{passwordError}</div>}

        <button
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
          type="submit"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default UserRegisterForm;
