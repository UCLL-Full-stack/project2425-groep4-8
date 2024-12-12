import React from "react";
import { Ingredient } from "../../types";
import styles from "../../styles/Home.module.css";
import { useTranslation } from "next-i18next";

type Props = {
  ingredients: Array<Ingredient>;
};

const IngredientOverviewTable: React.FC<Props> = ({ ingredients }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.tableContainer}>
      {ingredients && (
        <table className={styles.recipeTable}>
          <thead>
            <tr>
              <th scope="col">{t("pages.ingredient.name")}</th>
              <th scope="col">{t("pages.ingredient.category")}</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient, index) => (
              <tr key={index}>
                <td>{ingredient.name}</td>
                <td>{ingredient.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default IngredientOverviewTable;
