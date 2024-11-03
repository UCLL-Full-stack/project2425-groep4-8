import React from "react";
import { Recipe } from "../../types";
import styles from "../../styles/Home.module.css";

type Props = {
  recipe: Recipe;
  onClose: () => void;
};

const RecipeDetails: React.FC<Props> = ({ recipe, onClose }) => {
  return (
    <div className="recipe-details">
      <h2>{recipe.name}</h2>
      <button onClick={onClose} className={styles.closeButton}>
        Close
      </button>
      <table>
        <tbody>
          <tr>
            <td>ID:</td>
            <td>{recipe.id}</td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>{recipe.name}</td>
          </tr>
          <tr>
            <td>Description:</td>
            <td>{recipe.description}</td>
          </tr>

          <tr>
            <td>Reviews:</td>
            <td>
              {recipe.reviews && recipe.reviews.length > 0 ? (
                <ul>
                  {recipe.reviews.map((review, index) => (
                    <li key={index}>{review.text}</li>
                  ))}
                </ul>
              ) : (
                "No reviews"
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RecipeDetails;
