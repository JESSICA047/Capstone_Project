import React, { useState } from "react";
import NavbarLogin from "../../components/NavbarLogin/NavbarLogin";
import FooterLogin from "../../components/FooterLogin/FooterLogin";
import PlanFilter, {
  fitnessPlans,
} from "../../components/PlanFilter/PlanFilter";
import { recipes, recipes_list } from "../../assets/assets";
import "./MealPlan.css";

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

const calculateDailyNutrition = (dayMeals) => {
  let total = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  };

  Object.values(dayMeals).forEach((meal) => {
    if (meal) {
      // Example nutrition values - in real app, these would come from your database
      total.calories += 300; // Example value
      total.protein += 20;
      total.carbs += 30;
      total.fats += 10;
    }
  });

  return total;
};

const MealPlan = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedPlan, setSelectedPlan] = useState("Weight Loss");
  const [showMealSelector, setShowMealSelector] = useState(false);
  const [currentMealType, setCurrentMealType] = useState(null);
  const [mealPlan, setMealPlan] = useState(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = {
        Breakfast: null,
        Lunch: null,
        Dinner: null,
        Snack: null,
      };
      return acc;
    }, {})
  );
  const [showNutrition, setShowNutrition] = useState(false);

  const handleAddMeal = (mealType) => {
    setCurrentMealType(mealType);
    setShowMealSelector(true);
  };

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };

  const handleSelectMeal = (recipe) => {
    setMealPlan((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [currentMealType]: recipe,
      },
    }));
    setShowMealSelector(false);
    setCurrentMealType(null);
  };

  const getFilteredRecipes = () => {
    return recipes_list.filter(
      (recipe) =>
        recipe.category.includes(currentMealType) &&
        recipe.category.includes(selectedPlan)
    );
  };

  const dailyNutrition = calculateDailyNutrition(mealPlan[selectedDay]);

  return (
    <div className="meal-plan-page">
      <NavbarLogin />
      <div className="meal-plan-header">
        <img
          src={recipes.recipe}
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
            <div className="quick-actions">
              <button
                className="action-button"
                onClick={() => setShowNutrition(!showNutrition)}
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
              <button className="action-button">
                <span className="button-icon">💾</span>
                Save Plan
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
                  {mealPlan[selectedDay][mealType] && (
                    <div className="meal-slot-nutrition">
                      <span>300 kcal</span>
                    </div>
                  )}
                </div>
                {mealPlan[selectedDay][mealType] ? (
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
                          .map((tag, index) => (
                            <span key={index} className="meal-tag">
                              {tag}
                            </span>
                          ))}
                      </div>
                    </div>
                    <button
                      className="remove-meal-button"
                      onClick={() => {
                        setMealPlan((prev) => ({
                          ...prev,
                          [selectedDay]: {
                            ...prev[selectedDay],
                            [mealType]: null,
                          },
                        }));
                      }}
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
              {getFilteredRecipes().map((recipe) => (
                <div
                  key={recipe.id}
                  className="recipe-card"
                  onClick={() => handleSelectMeal(recipe)}
                >
                  <img src={recipe.image} alt={recipe.name} />
                  <h4>{recipe.name}</h4>
                  <p>{recipe.description}</p>
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
                      .map((tag, index) => (
                        <span key={index} className="recipe-tag">
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              className="close-modal-button"
              onClick={() => setShowMealSelector(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showNutrition && (
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
                          <span>300 kcal</span>
                        </div>
                        <div className="nutrition-item">
                          <span>Protein</span>
                          <span>20g</span>
                        </div>
                        <div className="nutrition-item">
                          <span>Carbs</span>
                          <span>30g</span>
                        </div>
                        <div className="nutrition-item">
                          <span>Fats</span>
                          <span>10g</span>
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
            <button
              className="close-modal-button"
              onClick={() => setShowNutrition(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <FooterLogin />
    </div>
  );
};

export default MealPlan;
