import React from "react";
import { Recipe } from "../../types";
import styles from "../../styles/Home.module.css";

type Props = {
  recipes: Recipe[];
  selectRecipe: (recipe: Recipe) => void;
};

const RecipeOverviewTable: React.FC<Props> = ({ recipes, selectRecipe }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.recipeTable}>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
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
