import React from "react";
import { Review } from "../../types";
import styles from "../../styles/Home.module.css";
import { useTranslation } from "next-i18next";

type Props = {
  reviews: Array<Review>;
  onDelete: (id: number) => void;
};

const ReviewOverviewTable: React.FC<Props> = ({ reviews, onDelete }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.tableContainer}>
      {reviews && (
        <table className={styles.recipeTable}>
          <thead>
            <tr>
              <th scope="col">{t("pages.review.score")}</th>
              <th scope="col">{t("pages.review.text")}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={index}>
                <td>{review.score}</td>
                <td>{review.text}</td>
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
