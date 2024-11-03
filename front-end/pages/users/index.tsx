import Header from "../../components/header";
import UserOverviewTable from "../../components/users/UserOverviewTable";
import Userservice from "../../services/UserService";
import { User } from "../../types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Users: React.FC = () => {
  const [users, setUser] = useState<Array<User>>([]);

  const getUsers = async () => {
    const response = await Userservice.getAllUsers();
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Users</h1>
        <section>
          <h2>Users overview</h2>
        </section>
        {users.length > 0 ? (
          <UserOverviewTable users={users} />
        ) : (
          <p>No Users available</p>
        )}
      </main>
    </>
  );
};
export default Users;
