import Header from "../../components/header";
import IngredientOverviewTable from "../../components/ingredients/IngredientOverviewTable";
import IngredientService from "../../services/IngredientService";
import { Ingredient } from "../../types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Ingredients: React.FC = () => {
  const [ingredients, setIngredient] = useState<Array<Ingredient>>([]);

  const getIngredients = async () => {
    const response = await IngredientService.getAllIngredients();
    const data = await response.json();
    console.log(data);
    setIngredient(data);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <>
      <Head>
        <title>Ingredients</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>ingredients</h1>
        <section>
          <h2>ingredients overview</h2>
        </section>
        {ingredients.length > 0 ? (
          <IngredientOverviewTable ingredients={ingredients} />
        ) : (
          <p>No ingredients available</p>
        )}
      </main>
    </>
  );
};
export default Ingredients;
