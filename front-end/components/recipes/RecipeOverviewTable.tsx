import React, { useEffect, useState } from "react";
import { Recipe, User } from "../../types";
import styles from "../../styles/Home.module.css";
import { useTranslation } from "next-i18next";

type Props = {
  recipes: Recipe[];
  selectRecipe: (recipe: Recipe) => void;
};

const RecipeOverviewTable: React.FC<Props> = ({ recipes, selectRecipe }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.tableContainer}>
      <table className={styles.recipeTable}>
        <thead>
          <tr>
            <th scope="col">{t("pages.recipe.name")}</th>
            <th scope="col">{t("pages.recipe.description")}</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe, index) => (
            <tr
              key={index}
              onClick={() => selectRecipe(recipe)}
              className={styles.tableRow}
            >
              <td>{recipe.name}</td>
              <td>{recipe.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeOverviewTable;
