import React from "react";
import { recipes_list } from "../../assets/assets";
import "./PlanFilter.css";

// PlanFilter Component
const PlanFilter = ({ selectedPlan, onPlanChange }) => {
  return (
    <div className="plan-filter">
      <h3>Meal Plan Type</h3>
      <div className="plan-options">
        <button
          className={`plan-option ${selectedPlan === "All" ? "active" : ""}`}
          onClick={() => onPlanChange("All")}
        >
          Custom Plan{" "}
        </button>
        <button
          className={`plan-option ${
            selectedPlan === "Weight Loss" ? "active" : ""
          }`}
          onClick={() => onPlanChange("Weight Loss")}
        >
          Weight Loss
        </button>
        <button
          className={`plan-option ${
            selectedPlan === "Muscle Gain" ? "active" : ""
          }`}
          onClick={() => onPlanChange("Muscle Gain")}
        >
          Muscle Gain
        </button>
        <button
          className={`plan-option ${
            selectedPlan === "Performance" ? "active" : ""
          }`}
          onClick={() => onPlanChange("Performance")}
        >
          Wellness
        </button>
      </div>
    </div>
  );
};

// Filter recipes based on plan type and meal type
const getFilteredRecipes = (planType, mealType) => {
  // Base filters that apply to all plans
  let filters = {
    Breakfast: (recipe) => recipe.category.includes("Breakfast"),
    Lunch: (recipe) => recipe.category.includes("Lunch"),
    Dinner: (recipe) => recipe.category.includes("Dinner"),
    Snack: (recipe) => recipe.category.includes("Snack"),
  };

  // Add plan-specific filters
  if (planType === "Weight Loss") {
    filters = {
      Breakfast: (recipe) =>
        recipe.category.includes("Breakfast") && recipe.calories < 400,
      Lunch: (recipe) =>
        recipe.category.includes("Lunch") && recipe.calories < 500,
      Dinner: (recipe) =>
        recipe.category.includes("Dinner") && recipe.calories < 600,
      Snack: (recipe) =>
        recipe.category.includes("Snack") && recipe.calories < 200,
    };
  } else if (planType === "Muscle Gain") {
    filters = {
      Breakfast: (recipe) =>
        recipe.category.includes("Breakfast") && recipe.protein > 20,
      Lunch: (recipe) =>
        recipe.category.includes("Lunch") && recipe.protein > 30,
      Dinner: (recipe) =>
        recipe.category.includes("Dinner") && recipe.protein > 35,
      Snack: (recipe) =>
        recipe.category.includes("Snack") && recipe.protein > 10,
    };
  } else if (planType === "Performance") {
    filters = {
      Breakfast: (recipe) =>
        recipe.category.includes("Breakfast") && recipe.carbs > 30,
      Lunch: (recipe) =>
        recipe.category.includes("Lunch") &&
        recipe.carbs > 40 &&
        recipe.protein > 20,
      Dinner: (recipe) =>
        recipe.category.includes("Dinner") &&
        recipe.carbs > 30 &&
        recipe.protein > 25,
      Snack: (recipe) => recipe.category.includes("Snack") && recipe.carbs > 15,
    };
  }

  return recipes_list.filter(filters[mealType] || (() => true));
};

// Get a random recipe from filtered recipes
const getRandomRecipe = (recipes) => {
  if (!recipes || recipes.length === 0) return null;
  return recipes[Math.floor(Math.random() * recipes.length)];
};

// Generate a curated meal plan based on plan type
export const generateCuratedMealPlan = (planType) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

  // Create empty meal plan
  const mealPlan = days.reduce((acc, day) => {
    acc[day] = {};
    mealTypes.forEach((type) => {
      acc[day][type] = null;
    });
    return acc;
  }, {});

  // Fill plan with recipes
  days.forEach((day) => {
    mealTypes.forEach((mealType) => {
      const filteredRecipes = getFilteredRecipes(planType, mealType);
      const selectedRecipe = getRandomRecipe(filteredRecipes);

      if (selectedRecipe) {
        mealPlan[day][mealType] = {
          ...selectedRecipe,
          dateAdded: new Date().toISOString(),
        };
      }
    });
  });

  return mealPlan;
};

export default PlanFilter;
