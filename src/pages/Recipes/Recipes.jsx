import React, { useState } from "react";
import { recipes_list } from "../../assets/assets";
import { recipes } from "../../assets/assets";
import NavbarLogin from "../../components/NavbarLogin/NavbarLogin";
import RecipeFilter from "../../components/RecipeFilter/RecipeFilter";
import RecipeDisplay from "../../components/RecipeDisplay/RecipeDisplay";
import "./Recipes.css";
import FooterLogin from "../../components/FooterLogin/FooterLogin";

const Recipes = () => {
  const [activeFilters, setActiveFilters] = useState({
    mealTypes: [],
    foodGroups: [],
    fitnessPlans: [],
  });

  // Filter recipes based on active filters
  const getFilteredRecipes = () => {
    if (
      activeFilters.mealTypes.length === 0 &&
      activeFilters.foodGroups.length === 0 &&
      activeFilters.fitnessPlans.length === 0
    ) {
      return recipes_list;
    }

    return recipes_list.filter((recipe) => {
      const matchesMealType =
        activeFilters.mealTypes.length === 0 ||
        recipe.category.some((cat) => activeFilters.mealTypes.includes(cat));

      const matchesFoodGroup =
        activeFilters.foodGroups.length === 0 ||
        recipe.category.some((cat) => activeFilters.foodGroups.includes(cat));

      const matchesFitnessPlan =
        activeFilters.fitnessPlans.length === 0 ||
        activeFilters.fitnessPlans.some(
          (plan) =>
            recipe.category.includes(plan) ||
            recipe.category.some((cat) => cat.includes(plan))
        );

      return matchesMealType && matchesFoodGroup && matchesFitnessPlan;
    });
  };

  return (
    <div className="recipes-page">
      <NavbarLogin />
      <div className="recipes-header">
        <img
          src={recipes.recipe}
          alt="Recipe Header"
          className="recipes-header-image"
        />
        <div className="recipes-header-content">
          <h1>Explore Healthy and Tasty Recipes</h1>
          <p>
            Discover a variety of nutritious recipes that cater to your healthy
            eating goals. Enjoy meals that are both delicious and easy to
            prepare.
          </p>
        </div>
      </div>
      <div className="recipes-container">
        <RecipeFilter
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />
        <div className="recipes-main">
          {(activeFilters.mealTypes.length > 0 ||
            activeFilters.foodGroups.length > 0 ||
            activeFilters.fitnessPlans.length > 0) && (
            <div className="active-filters">
              {[
                ...activeFilters.mealTypes,
                ...activeFilters.foodGroups,
                ...activeFilters.fitnessPlans,
              ].map((filter, index) => (
                <span key={index} className="filter-tag">
                  {filter}
                </span>
              ))}
            </div>
          )}
          <RecipeDisplay recipes={getFilteredRecipes()} />
        </div>
      </div>
      <FooterLogin />
    </div>
  );
};

export default Recipes;
