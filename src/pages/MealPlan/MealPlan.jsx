import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarLogin from "../../components/NavbarLogin/NavbarLogin";
import FooterLogin from "../../components/FooterLogin/FooterLogin";
import PlanFilter from "../../components/PlanFilter/PlanFilter";
import { recipes_list } from "../../assets/assets";
import { recipes } from "../../assets/assets";
import { useToast } from "../../contexts/ToastContext";
import "./MealPlan.css";

const MealPlan = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedPlan, setSelectedPlan] = useState("All");
  const [showMealSelector, setShowMealSelector] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);
  const [currentMealType, setCurrentMealType] = useState("");
  const [mealPlan, setMealPlan] = useState({});
  const [hasMealsPlanned, setHasMealsPlanned] = useState(false);
  const [dailyNutrition, setDailyNutrition] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  });

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

  // Initialize empty meal plan
  const emptyMealPlan = daysOfWeek.reduce((acc, day) => {
    acc[day] = {};
    mealTypes.forEach((type) => {
      acc[day][type] = null;
    });
    return acc;
  }, {});

  // Load meal plan from localStorage when component mounts
  useEffect(() => {
    const savedMealPlan = JSON.parse(localStorage.getItem("mealPlan") || "[]");

    if (savedMealPlan.length > 0) {
      // Transform the flat array into a structured object by day and meal type
      const transformedMealPlan = { ...emptyMealPlan };

      savedMealPlan.forEach((item) => {
        // Find the full recipe data
        const fullRecipe = recipes_list.find((r) => r.id === item.recipeId);

        if (fullRecipe && item.day && item.meal) {
          transformedMealPlan[item.day][item.meal] = {
            ...fullRecipe,
            dateAdded: item.dateAdded,
          };
        }
      });

      setMealPlan(transformedMealPlan);
      setHasMealsPlanned(true);
    } else {
      setMealPlan(emptyMealPlan);
    }
  }, []);

  // Calculate and update daily nutrition whenever the selected day or meal plan changes
  useEffect(() => {
    if (mealPlan && mealPlan[selectedDay]) {
      const dayMeals = Object.values(mealPlan[selectedDay]).filter(
        (meal) => meal !== null
      );

      const totals = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
      };

      dayMeals.forEach((meal) => {
        if (meal) {
          totals.calories += meal.calories || 0;
          totals.protein += meal.protein || 0;
          totals.carbs += meal.carbs || 0;
          totals.fats += meal.fat || 0; // Note: recipe data uses 'fat' not 'fats'
        }
      });

      setDailyNutrition(totals);
    }
  }, [selectedDay, mealPlan]);

  // Check if any meals are planned when mealPlan changes
  useEffect(() => {
    const hasAnyMeals = Object.values(mealPlan).some((day) =>
      Object.values(day).some((meal) => meal !== null)
    );
    setHasMealsPlanned(hasAnyMeals);
  }, [mealPlan]);

  // Update localStorage when meal plan changes
  useEffect(() => {
    if (Object.keys(mealPlan).length > 0) {
      // Convert the structured meal plan back to a flat array for localStorage
      const storageFormat = [];

      Object.entries(mealPlan).forEach(([day, meals]) => {
        Object.entries(meals).forEach(([mealType, recipe]) => {
          if (recipe) {
            storageFormat.push({
              day,
              meal: mealType,
              recipeId: recipe.id,
              recipeName: recipe.name,
              recipeImage: recipe.image,
              recipeCalories: recipe.calories || 0,
              recipeProtein: recipe.protein || 0,
              recipeCarbs: recipe.carbs || 0,
              recipeFat: recipe.fat || 0,
              dateAdded: recipe.dateAdded || new Date().toISOString(),
            });
          }
        });
      });

      localStorage.setItem("mealPlan", JSON.stringify(storageFormat));
    }
  }, [mealPlan]);

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };

  const handleAddMeal = (mealType) => {
    setCurrentMealType(mealType);
    setShowMealSelector(true);
  };

  const handleSelectMeal = (recipe) => {
    const updatedMealPlan = { ...mealPlan };
    updatedMealPlan[selectedDay][currentMealType] = {
      ...recipe,
      dateAdded: new Date().toISOString(),
    };

    setMealPlan(updatedMealPlan);
    setShowMealSelector(false);
    showToast(
      `${recipe.name} added to your ${selectedDay} ${currentMealType}`,
      "success"
    );
  };

  const handleRemoveMeal = (mealType) => {
    const mealName = mealPlan[selectedDay][mealType]?.name || "Meal";

    const updatedMealPlan = { ...mealPlan };
    updatedMealPlan[selectedDay][mealType] = null;

    setMealPlan(updatedMealPlan);
    showToast(`${mealName} removed from your meal plan`, "info");
  };

  const handleClearMealPlan = () => {
    if (
      window.confirm("Are you sure you want to clear your entire meal plan?")
    ) {
      setMealPlan(emptyMealPlan);
      localStorage.removeItem("mealPlan");
      showToast("Meal plan has been cleared", "info");
    }
  };

  // Fix getFilteredRecipes to return an array
  const getFilteredRecipes = () => {
    return recipes_list.filter((recipe) => {
      // First check if this recipe is appropriate for the current meal type
      const matchesMealType = recipe.category.some(
        (cat) =>
          cat === currentMealType ||
          (currentMealType === "Breakfast" && cat === "Breakfast") ||
          (currentMealType === "Lunch" &&
            (cat === "Lunch" || cat === "Dinner")) ||
          (currentMealType === "Dinner" &&
            (cat === "Dinner" || cat === "Lunch")) ||
          (currentMealType === "Snack" && cat === "Snack")
      );

      // Then check if it matches the selected fitness plan
      const matchesPlan =
        selectedPlan === "All" ||
        recipe.category.some(
          (cat) =>
            cat === selectedPlan ||
            (selectedPlan === "Weight Loss" &&
              (cat === "Weight Loss" || cat === "Wellness")) ||
            (selectedPlan === "Muscle Gain" &&
              (cat === "Muscle Gain" ||
                cat === "Performance" ||
                cat === "Lean Muscle")) ||
            (selectedPlan === "Performance" &&
              (cat === "Performance" || cat === "Protein"))
        );

      return matchesMealType && matchesPlan;
    });
  };

  // Safely access image
  const headerImage =
    recipes && recipes.recipe ? recipes.recipe : "path/to/default/image";

  return (
    <div className="meal-plan-page">
      <NavbarLogin />
      <div className="meal-plan-header">
        <img
          src={headerImage}
          alt="Meal Plan Header"
          className="meal-plan-header-image"
        />
        <div className="meal-plan-header-content">
          <h1>Your Weekly Meal Plan</h1>
          <p>
            Plan your meals for the week ahead. Stay organized and maintain a
            healthy diet with our meal planning tool.
          </p>
        </div>
      </div>

      <div className="meal-plan-layout">
        <aside className="meal-plan-sidebar">
          <PlanFilter
            selectedPlan={selectedPlan}
            onPlanChange={handlePlanChange}
          />

          <div className="sidebar-section">
            <h3>Daily Nutrition Summary</h3>
            <div className="nutrition-stats">
              <div className="nutrition-stat">
                <span className="stat-icon">🔥</span>
                <span className="stat-value">{dailyNutrition.calories}</span>
                <span className="stat-label">Calories</span>
              </div>
              <div className="nutrition-stat">
                <span className="stat-icon">🥩</span>
                <span className="stat-value">{dailyNutrition.protein}g</span>
                <span className="stat-label">Protein</span>
              </div>
              <div className="nutrition-stat">
                <span className="stat-icon">🌾</span>
                <span className="stat-value">{dailyNutrition.carbs}g</span>
                <span className="stat-label">Carbs</span>
              </div>
              <div className="nutrition-stat">
                <span className="stat-icon">🥑</span>
                <span className="stat-value">{dailyNutrition.fats}g</span>
                <span className="stat-label">Fats</span>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Quick Actions</h3>
            {/* Remove the redundant image in the sidebar */}
            <div className="quick-actions">
              <button
                className="action-button"
                onClick={() => setShowNutrition(!showNutrition)}
                disabled={!hasMealsPlanned}
              >
                <span className="button-icon">📊</span>
                Detailed Nutrition
              </button>
              <button className="action-button">
                <span className="button-icon">🛒</span>
                Shopping List
              </button>
              <button className="action-button">
                <span className="button-icon">📱</span>
                Share Plan
              </button>
              <button
                className="action-button"
                onClick={handleClearMealPlan}
                disabled={!hasMealsPlanned}
              >
                <span className="button-icon">🗑️</span>
                Clear Plan
              </button>
            </div>
          </div>
        </aside>

        <main className="meal-plan-main">
          <div className="days-navigation">
            {daysOfWeek.map((day) => (
              <button
                key={day}
                className={`day-button ${selectedDay === day ? "active" : ""}`}
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="meals-grid">
            {mealTypes.map((mealType) => (
              <div key={mealType} className="meal-slot">
                <div className="meal-slot-header">
                  <h3>{mealType}</h3>
                  {mealPlan &&
                    mealPlan[selectedDay] &&
                    mealPlan[selectedDay][mealType] && (
                      <div className="meal-slot-nutrition">
                        <span>
                          {mealPlan[selectedDay][mealType].calories || 0} kcal
                        </span>
                      </div>
                    )}
                </div>
                {mealPlan &&
                mealPlan[selectedDay] &&
                mealPlan[selectedDay][mealType] ? (
                  <div className="planned-meal">
                    <img
                      src={mealPlan[selectedDay][mealType].image}
                      alt={mealPlan[selectedDay][mealType].name}
                      className="meal-image"
                    />
                    <div className="meal-info">
                      <h4>{mealPlan[selectedDay][mealType].name}</h4>
                      <div className="meal-tags">
                        <p className="meal-plan-tag">{selectedPlan}</p>
                        {mealPlan[selectedDay][mealType].category
                          .filter(
                            (cat) =>
                              ![
                                "Breakfast",
                                "Lunch",
                                "Dinner",
                                "Snack",
                              ].includes(cat)
                          )
                          .slice(0, 2) // Limit to first 2 tags
                          .map((tag, index) => (
                            <span key={index} className="meal-tag">
                              {tag}
                            </span>
                          ))}
                        {mealPlan[selectedDay][mealType].category.filter(
                          (cat) =>
                            !["Breakfast", "Lunch", "Dinner", "Snack"].includes(
                              cat
                            )
                        ).length > 2 && (
                          <span className="meal-tag more-tag">
                            +
                            {mealPlan[selectedDay][mealType].category.filter(
                              (cat) =>
                                ![
                                  "Breakfast",
                                  "Lunch",
                                  "Dinner",
                                  "Snack",
                                ].includes(cat)
                            ).length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      className="remove-meal-button"
                      onClick={() => handleRemoveMeal(mealType)}
                      aria-label={`Remove ${mealPlan[selectedDay][mealType].name}`}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <button
                    className="add-meal-button"
                    onClick={() => handleAddMeal(mealType)}
                  >
                    <span className="add-icon">+</span>
                    <span>Add {mealType}</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>

      {showMealSelector && (
        <div className="meal-selector-modal">
          <div className="modal-content">
            <h2>Select {currentMealType}</h2>
            <p className="modal-subtitle">
              Recommended meals for your {selectedPlan} Plan
            </p>
            <div className="recipe-grid">
              {getFilteredRecipes().length > 0 ? (
                getFilteredRecipes().map((recipe) => (
                  <div
                    key={recipe.id}
                    className="recipe-card"
                    onClick={() => handleSelectMeal(recipe)}
                  >
                    <img src={recipe.image} alt={recipe.name} />
                    <h4>{recipe.name}</h4>
                    <p>{recipe.description}</p>
                    <div className="recipe-nutrition">
                      {recipe.calories && (
                        <span className="nutrition-badge">
                          {recipe.calories} cal
                        </span>
                      )}
                      {recipe.protein && (
                        <span className="nutrition-badge">
                          {recipe.protein}g protein
                        </span>
                      )}
                    </div>
                    <div className="recipe-tags">
                      {recipe.category
                        .filter(
                          (cat) =>
                            cat !== currentMealType &&
                            cat !== selectedPlan &&
                            !["Breakfast", "Lunch", "Dinner", "Snack"].includes(
                              cat
                            )
                        )
                        .slice(0, 3)
                        .map((tag, index) => (
                          <span key={index} className="recipe-tag">
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-recipes-message">
                  <p>No recipes found for this meal type and plan.</p>
                  <p>Try selecting a different plan or add custom recipes.</p>
                </div>
              )}
            </div>
            <div className="modal-actions">
              <button
                className="close-modal-button"
                onClick={() => setShowMealSelector(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showNutrition && mealPlan && mealPlan[selectedDay] && (
        <div className="nutrition-modal">
          <div className="modal-content">
            <h2>Detailed Nutrition Information</h2>
            <div className="nutrition-details">
              {Object.entries(mealPlan[selectedDay]).map(
                ([mealType, meal]) =>
                  meal && (
                    <div key={mealType} className="meal-nutrition">
                      <h4>
                        {mealType}: {meal.name}
                      </h4>
                      <div className="nutrition-grid">
                        <div className="nutrition-item">
                          <span>Calories</span>
                          <span>{meal.calories || 0} kcal</span>
                        </div>
                        <div className="nutrition-item">
                          <span>Protein</span>
                          <span>{meal.protein || 0}g</span>
                        </div>
                        <div className="nutrition-item">
                          <span>Carbs</span>
                          <span>{meal.carbs || 0}g</span>
                        </div>
                        <div className="nutrition-item">
                          <span>Fats</span>
                          <span>{meal.fat || 0}g</span>
                        </div>
                      </div>
                    </div>
                  )
              )}
              <div className="daily-total">
                <h4>Daily Total</h4>
                <div className="nutrition-grid">
                  <div className="nutrition-item total">
                    <span>Calories</span>
                    <span>{dailyNutrition.calories} kcal</span>
                  </div>
                  <div className="nutrition-item total">
                    <span>Protein</span>
                    <span>{dailyNutrition.protein}g</span>
                  </div>
                  <div className="nutrition-item total">
                    <span>Carbs</span>
                    <span>{dailyNutrition.carbs}g</span>
                  </div>
                  <div className="nutrition-item total">
                    <span>Fats</span>
                    <span>{dailyNutrition.fats}g</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="close-modal-button"
                onClick={() => setShowNutrition(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <FooterLogin />
    </div>
  );
};

export default MealPlan;
