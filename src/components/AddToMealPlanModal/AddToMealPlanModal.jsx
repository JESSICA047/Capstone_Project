import React, { useState } from "react";
import "./AddToMealPlanModal.css";

const AddToMealPlanModal = ({ recipe, isOpen, onClose, onSave }) => {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("");

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const meals = ["Breakfast", "Lunch", "Dinner", "Snack"];

  const handleSave = () => {
    if (selectedDay && selectedMeal) {
      onSave({
        recipeId: recipe.id,
        recipeName: recipe.name,
        day: selectedDay,
        meal: selectedMeal,
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="meal-plan-modal">
        <div className="modal-header">
          <h2>Add to Meal Plan</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">
          <h3>{recipe.name}</h3>

          <div className="select-container">
            <label htmlFor="day-select">Select Day</label>
            <select
              id="day-select"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
            >
              <option value="">Select a day</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          <div className="select-container">
            <label htmlFor="meal-select">Select Meal</label>
            <select
              id="meal-select"
              value={selectedMeal}
              onChange={(e) => setSelectedMeal(e.target.value)}
            >
              <option value="">Select a meal</option>
              {meals.map((meal) => (
                <option key={meal} value={meal}>
                  {meal}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button
            className="save-button"
            onClick={handleSave}
            disabled={!selectedDay || !selectedMeal}
          >
            Add to Meal Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToMealPlanModal;
