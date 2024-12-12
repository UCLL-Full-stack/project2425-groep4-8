import React from "react";
import { User } from "../../types";
import styles from "../../styles/Home.module.css";
import { useTranslation } from "next-i18next";

type Props = {
  users: Array<User>;
};

const UserOverviewTable: React.FC<Props> = ({ users }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.tableContainer}>
      {users && (
        <table className={styles.recipeTable}>
          <thead>
            <tr>
              <th scope="col">{t("pages.user.firstname")}</th>
              <th scope="col">{t("pages.user.lastname")}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserOverviewTable;
