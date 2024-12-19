import React, { useEffect, useState } from "react";
import { Review, User } from "../../types";
import styles from "../../styles/Home.module.css";
import { useTranslation } from "next-i18next";

type Props = {
  reviews: Array<Review>;
  onDelete: (id: number) => void;
};

const ReviewOverviewTable: React.FC<Props> = ({ reviews, onDelete }: Props) => {
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
      {reviews && (
        <table className={styles.recipeTable}>
          <thead>
            <tr>
              <th scope="col">{t("pages.review.score")}</th>
              <th scope="col">{t("pages.review.text")}</th>
              {loggedInUser?.role !== "user" && (
                <>
                  <th scope="col">Username Owner</th>
                </>
              )}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={index}>
                <td>{review.score}</td>
                <td>{review.text}</td>
                {loggedInUser?.role !== "user" && (
                  <>
                    <td>{review.user?.username}</td>
                  </>
                )}
                <td>
                  <button
                    className="border border-red-300 bg-red-600 text-white p-2 rounded-xl"
                    onClick={() =>
                      review.id !== undefined && onDelete(review.id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReviewOverviewTable;
