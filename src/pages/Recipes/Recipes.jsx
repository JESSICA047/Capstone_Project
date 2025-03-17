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
    dietaryPreferences: [], // Add this new filter category
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Filter recipes based on active filters and search query
  const getFilteredRecipes = () => {
    let filteredRecipes = recipes_list;

    // Apply search query filter first
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredRecipes = filteredRecipes.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(query) ||
          recipe.description.toLowerCase().includes(query)
      );
    }

    // Then apply category filters
    if (
      activeFilters.mealTypes.length === 0 &&
      activeFilters.foodGroups.length === 0 &&
      activeFilters.fitnessPlans.length === 0 &&
      activeFilters.dietaryPreferences.length === 0
    ) {
      return filteredRecipes;
    }

    return filteredRecipes.filter((recipe) => {
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

      // Add dietary preferences filter
      const matchesDietaryPreferences =
        activeFilters.dietaryPreferences.length === 0 ||
        (recipe.dietaryTags &&
          activeFilters.dietaryPreferences.some((pref) =>
            recipe.dietaryTags.includes(pref)
          ));

      return (
        matchesMealType &&
        matchesFoodGroup &&
        matchesFitnessPlan &&
        matchesDietaryPreferences
      );
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
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <div className="recipes-main">
          {(activeFilters.mealTypes.length > 0 ||
            activeFilters.foodGroups.length > 0 ||
            activeFilters.fitnessPlans.length > 0 ||
            activeFilters.dietaryPreferences.length > 0) && (
            <div className="active-filters">
              {[
                ...activeFilters.mealTypes,
                ...activeFilters.foodGroups,
                ...activeFilters.fitnessPlans,
                ...(activeFilters.dietaryPreferences || []),
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
