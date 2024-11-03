import React from "react";
import { Ingredient } from "../../types";
import styles from "../../styles/Home.module.css";

type Props = {
  ingredients: Array<Ingredient>;
};

const IngredientOverviewTable: React.FC<Props> = ({ ingredients }: Props) => {
  return (
    <div className={styles.tableContainer}>
      {ingredients && (
        <table className={styles.recipeTable}>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
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
