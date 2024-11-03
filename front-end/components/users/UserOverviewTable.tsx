import React from "react";
import { User } from "../../types";
import styles from "../../styles/Home.module.css";

type Props = {
  users: Array<User>;
};

const UserOverviewTable: React.FC<Props> = ({ users }: Props) => {
  return (
    <div className={styles.tableContainer}>
      {users && (
        <table className={styles.recipeTable}>
          <thead>
            <tr>
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
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
