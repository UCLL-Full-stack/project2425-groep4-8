import React from "react";
import { Review } from "../../types";
import styles from "../../styles/Home.module.css";
import { useTranslation } from "next-i18next";

type Props = {
  reviews: Array<Review>;
};

const ReviewOverviewTable: React.FC<Props> = ({ reviews }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.tableContainer}>
      {reviews && (
        <table className={styles.recipeTable}>
          <thead>
            <tr>
              <th scope="col">{t("pages.review.score")}</th>
              <th scope="col">{t("pages.review.text")}</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={index}>
                <td>{review.score}</td>
                <td>{review.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReviewOverviewTable;
