import React from "react";
import "./PlanFilter.css";

export const fitnessPlans = {
  "Weight Loss": {
    id: "weight-loss",
    description: "Calorie-controlled meals to support healthy weight loss",
    icon: "🏋️‍♂️",
  },
  "Muscle Gain": {
    id: "muscle-gain",
    description: "High-protein meals for muscle building and recovery",
    icon: "💪",
  },
  Wellness: {
    id: "wellness",
    description: "Balanced nutrition for overall health and vitality",
    icon: "🌱",
  },
  Performance: {
    id: "performance",
    description: "Energy-optimized meals for athletic performance",
    icon: "🎯",
  },
  "Strength Training": {
    id: "strength",
    description: "Power-packed meals for strength and endurance",
    icon: "🏋️",
  },
  "Lean Muscle": {
    id: "lean-muscle",
    description: "Clean eating for lean muscle development",
    icon: "⚡",
  },
};

const PlanFilter = ({ selectedPlan, onPlanChange }) => {
  return (
    <div className="plan-filter">
      <h2>Fitness Goals</h2>
      <div className="plan-options">
        {Object.entries(fitnessPlans).map(([planName, planInfo]) => (
          <button
            key={planInfo.id}
            className={`plan-button ${
              selectedPlan === planName ? "active" : ""
            }`}
            onClick={() => onPlanChange(planName)}
          >
            <span className="plan-icon">{planInfo.icon}</span>
            <div className="plan-info">
              <h3>{planName}</h3>
              <p>{planInfo.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlanFilter;
