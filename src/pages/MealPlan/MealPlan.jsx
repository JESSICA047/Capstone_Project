import { useState, useEffect, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
import NavbarLogin from "../../components/NavbarLogin/NavbarLogin";
import FooterLogin from "../../components/FooterLogin/FooterLogin";
import PlanFilter from "../../components/PlanFilter/PlanFilter";
import { recipes_list } from "../../assets/assets";
import { recipes } from "../../assets/assets";
import { useToast } from "../../contexts/ToastContext";
import { useUserStats } from "../../contexts/UserStatsContext/UserStatsContext";
import "./MealPlan.css";
import PropTypes from "prop-types";

const MealPlan = ({ setIsLoggedIn }) => {
  // const navigate = useNavigate();
  const { updateStat } = useUserStats();
  const { showToast } = useToast();
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Get current day of week
  const getCurrentDay = () => {
    const today = new Date().getDay(); // 0 is Sunday, 1 is Monday, etc.
    // Convert JS day format to our array index (0=Monday, 6=Sunday)
    const dayIndex = today === 0 ? 6 : today - 1;
    return daysOfWeek[dayIndex];
  };

  const [selectedDay, setSelectedDay] = useState(getCurrentDay());
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

  const [planChanged, setPlanChanged] = useState(false);
  const [lastSelectedPlan, setLastSelectedPlan] = useState(null);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showPlanConfirmation, setShowPlanConfirmation] = useState(false);
  const [pendingPlanChange, setPendingPlanChange] = useState(null);
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);

  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

  const planTemplates = [
    {
      id: "Weight Loss",
      name: "Weight Loss Plan",
      description: "1500-1800 calories per day with focus on whole foods",
    },
    {
      id: "Muscle Gain",
      name: "Muscle Building Plan",
      description: "High protein meals to support muscle growth and recovery",
    },
    {
      id: "Wellness",
      name: "Wellness Plan",
      description: "Balanced nutrition for optimal energy and performance",
    },
  ];

  // Create memoized version of emptyMealPlan
  const emptyMealPlan = useMemo(() => {
    return daysOfWeek.reduce((acc, day) => {
      acc[day] = {};
      mealTypes.forEach((type) => {
        acc[day][type] = null;
      });
      return acc;
    }, {});
  }, [daysOfWeek, mealTypes]); // Only recreate if these arrays change

  // Handle saving a recipe to favorites
  const handleSaveRecipe = (recipe) => {
    try {
      // Get existing saved recipes
      const savedRecipesJSON = localStorage.getItem("savedRecipes");
      let savedRecipes = savedRecipesJSON ? JSON.parse(savedRecipesJSON) : [];

      // Check if recipe is already saved
      const isAlreadySaved = savedRecipes.some((item) => item.id === recipe.id);

      if (!isAlreadySaved) {
        // Prepare recipe data with timestamp
        const recipeToSave = {
          ...recipe,
          savedAt: new Date().toISOString(),
        };

        // Add to saved recipes
        savedRecipes.push(recipeToSave);

        // Save to localStorage
        localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
        updateStat("recipesBookmarked", savedRecipes.length);

        showToast(`${recipe.name} added to your saved recipes`, "success");
      } else {
        showToast(`${recipe.name} is already in your saved recipes`, "info");
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
      showToast("Could not save recipe", "error");
    }
  };

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
      // No saved meal plan, show template selector
      setMealPlan(emptyMealPlan);
      setShowTemplateSelector(true);
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
        Snack: (recipe) =>
          recipe.category.includes("Snack") && recipe.carbs > 15,
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
  const generateCuratedMealPlan = (planType) => {
    // Create empty meal plan
    const newMealPlan = daysOfWeek.reduce((acc, day) => {
      acc[day] = {};
      mealTypes.forEach((type) => {
        acc[day][type] = null;
      });
      return acc;
    }, {});

    // Fill plan with recipes
    daysOfWeek.forEach((day) => {
      mealTypes.forEach((mealType) => {
        const filteredRecipes = getFilteredRecipes(planType, mealType);
        const selectedRecipe = getRandomRecipe(filteredRecipes);

        if (selectedRecipe) {
          newMealPlan[day][mealType] = {
            ...selectedRecipe,
            dateAdded: new Date().toISOString(),
          };
        }
      });
    });

    return newMealPlan;
  };

  // Function to check if we should load a new plan
  const shouldLoadNewPlan = (newPlan) => {
    // Return true if it's a completely different plan or we haven't modified the current one
    return newPlan !== lastSelectedPlan || !planChanged;
  };

  // Handle plan selection
  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);

    // Skip loading curated plan for "All" option
    if (plan === "All") return;

    // Check if we should load a new plan

    if (shouldLoadNewPlan(plan)) {
      // Check if user wants to replace existing plan
      if (hasMealsPlanned && lastSelectedPlan !== null) {
        // Show the confirmation modal instead of using window.confirm
        setPendingPlanChange(plan);
        setShowPlanConfirmation(true);
      } else {
        // Load plan if there's no existing plan
        loadCuratedPlan(plan);
      }
    }
  };

  // Confirm plan change from the modal
  const confirmPlanChange = () => {
    if (pendingPlanChange) {
      loadCuratedPlan(pendingPlanChange);
      setShowPlanConfirmation(false);
    }
  };

  // Cancel plan change from the modal
  const cancelPlanChange = () => {
    // Revert the selection if user cancels
    setSelectedPlan(lastSelectedPlan);
    setShowPlanConfirmation(false);
  };

  // Load a curated meal plan
  const loadCuratedPlan = (planType) => {
    const newPlan = generateCuratedMealPlan(planType);
    setMealPlan(newPlan);
    setLastSelectedPlan(planType);
    setPlanChanged(false);
    showToast(`${planType} meal plan loaded`, "success");
  };

  // Add a meal to the plan
  const handleAddMeal = (mealType) => {
    setCurrentMealType(mealType);
    setShowMealSelector(true);
  };

  // Select a meal from the selector
  const handleSelectMeal = (recipe) => {
    const updatedMealPlan = { ...mealPlan };
    updatedMealPlan[selectedDay][currentMealType] = {
      ...recipe,
      dateAdded: new Date().toISOString(),
    };

    setMealPlan(updatedMealPlan);
    setPlanChanged(true); // Mark that the user has customized the plan
    setShowMealSelector(false);
    showToast(
      `${recipe.name} added to your ${selectedDay} ${currentMealType}`,
      "success"
    );
  };

  // Remove a meal from the plan
  const handleRemoveMeal = (mealType) => {
    const mealName = mealPlan[selectedDay][mealType]?.name || "Meal";

    const updatedMealPlan = { ...mealPlan };
    updatedMealPlan[selectedDay][mealType] = null;

    setMealPlan(updatedMealPlan);
    setPlanChanged(true); // Mark that the user has customized the plan
    showToast(`${mealName} removed from your meal plan`, "info");
  };

  // Clear the entire meal plan
  // Clear the entire meal plan
  const handleClearMealPlan = () => {
    setShowClearConfirmation(true);
  };

  // Confirm clear plan from the modal
  const confirmClearPlan = () => {
    setMealPlan(emptyMealPlan);
    setLastSelectedPlan(null);
    setPlanChanged(false);
    localStorage.removeItem("mealPlan");
    showToast("Meal plan has been cleared", "info");
    setShowClearConfirmation(false);
  };

  // Cancel clear plan from the modal
  const cancelClearPlan = () => {
    setShowClearConfirmation(false);
  };

  // Filter recipes for the meal selector
  const getFilteredRecipesForSelector = () => {
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
      <NavbarLogin setIsLoggedIn={setIsLoggedIn} />
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

          {selectedPlan !== "All" && (
            <div className="plan-info-banner">
              <h3>{selectedPlan} Plan</h3>
              <p>
                {selectedPlan === "Weight Loss" &&
                  "Lower calorie meals to help you reach your weight loss goals."}
                {selectedPlan === "Muscle Gain" &&
                  "High protein meals designed to support muscle growth and recovery."}
                {selectedPlan === "Performance" &&
                  "Balanced nutrition for optimal energy and performance."}
              </p>
              {planChanged && (
                <p>
                  <em>This plan has been customized by you</em>
                </p>
              )}
            </div>
          )}

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
                onClick={() => setShowTemplateSelector(true)}
              >
                <span className="button-icon">📋</span>
                Curated Plans
              </button>

              {lastSelectedPlan &&
                lastSelectedPlan !== "All" &&
                planChanged && (
                  <button
                    className="action-button warning"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Reset to the original ${lastSelectedPlan} plan?`
                        )
                      ) {
                        loadCuratedPlan(lastSelectedPlan);
                      }
                    }}
                  >
                    <span className="button-icon">🔄</span>
                    Reset Plan
                  </button>
                )}

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
                      </div>
                    </div>
                    <div className="meal-actions">
                      <button
                        className="save-recipe-button"
                        onClick={() =>
                          handleSaveRecipe(mealPlan[selectedDay][mealType])
                        }
                        aria-label={`Save ${mealPlan[selectedDay][mealType].name} to your recipes`}
                      >
                        ❤️ Save
                      </button>
                      <button
                        className="remove-meal-button"
                        onClick={() => handleRemoveMeal(mealType)}
                        aria-label={`Remove ${mealPlan[selectedDay][mealType].name}`}
                      >
                        ×
                      </button>
                    </div>
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

      {/* Template Selector Modal */}
      {showTemplateSelector && (
        <div className="meal-selector-modal">
          <div className="modal-content">
            <h2>Select a Curated Meal Plan</h2>
            <p className="modal-subtitle">
              Choose a starting plan based on your goals. You can customize it
              later.
            </p>

            <div className="plan-templates-grid">
              {planTemplates.map((template) => (
                <div key={template.id} className="plan-template-card">
                  <h3>{template.name}</h3>
                  <p>{template.description}</p>
                  <button
                    className="select-plan-btn"
                    onClick={() => {
                      setSelectedPlan(template.id);
                      loadCuratedPlan(template.id);
                      setShowTemplateSelector(false);
                    }}
                  >
                    Use This Plan
                  </button>
                </div>
              ))}
            </div>

            <div className="modal-actions">
              <button
                className="close-modal-button"
                onClick={() => setShowTemplateSelector(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Meal Selector Modal */}
      {showMealSelector && (
        <div className="meal-selector-modal">
          <div className="modal-content">
            <h2>Select {currentMealType}</h2>
            <p className="modal-subtitle">
              Recommended meals for your {selectedPlan} Plan
            </p>
            <div className="recipe-grid">
              {getFilteredRecipesForSelector().length > 0 ? (
                getFilteredRecipesForSelector().map((recipe) => (
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
                    <div className="recipe-selector-actions">
                      <button
                        className="select-recipe-btn"
                        onClick={() => handleSelectMeal(recipe)}
                      >
                        Add to Plan
                      </button>
                      <button
                        className="save-recipe-btn"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent selecting the meal
                          handleSaveRecipe(recipe);
                        }}
                      >
                        Save ❤️
                      </button>
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

      {/* Nutrition Modal */}
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

      {/* Plan Change Confirmation Modal */}
      {showPlanConfirmation && (
        <div className="meal-selector-modal">
          <div className="modal-content">
            <h2>Change Meal Plan?</h2>
            <p className="modal-subtitle">
              Load the {pendingPlanChange} meal plan? This will replace your
              current plan.
            </p>
            <div className="modal-actions">
              <button className="confirm-button" onClick={confirmPlanChange}>
                Load New Plan
              </button>
              <button className="close-modal-button" onClick={cancelPlanChange}>
                Keep Current Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear Plan Confirmation Modal */}
      {showClearConfirmation && (
        <div className="meal-selector-modal">
          <div className="modal-content">
            <h2>Clear Meal Plan?</h2>
            <p className="modal-subtitle">
              Are you sure you want to clear your entire meal plan? This action
              cannot be undone.
            </p>
            <div className="modal-actions">
              <button
                className="confirm-button warning"
                onClick={confirmClearPlan}
              >
                Clear Plan
              </button>
              <button className="close-modal-button" onClick={cancelClearPlan}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <FooterLogin />
    </div>
  );
};

// Add prop validation
MealPlan.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default MealPlan;
