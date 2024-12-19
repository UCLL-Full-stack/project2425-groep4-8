import React, { useEffect, useState } from "react";
import { User } from "../../types";
import styles from "../../styles/Home.module.css";
import { useTranslation } from "next-i18next";

type Props = {
  users: Array<User>;
  onDelete: (id: number) => void;
};

const UserOverviewTable: React.FC<Props> = ({ users, onDelete }: Props) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const user = sessionStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }

    console.log("user " + user);
  }, []);

  const { t } = useTranslation();

  return (
    <div className={styles.tableContainer}>
      {users && (
        <table className={styles.recipeTable}>
          <thead>
            <tr>
              <th scope="col">{t("pages.user.firstname")}</th>
              <th scope="col">{t("pages.user.lastname")}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                {loggedInUser?.role === "admin" && (
                  <td>
                    <button
                      className="border border-red-300 bg-red-600 text-white p-2 rounded-xl"
                      onClick={() => user.id !== undefined && onDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserOverviewTable;
