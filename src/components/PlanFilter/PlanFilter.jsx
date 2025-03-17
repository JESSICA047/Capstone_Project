import React from "react";
import "./PlanFilter.css";

const PlanFilter = ({ selectedPlan, onPlanChange }) => {
  const plans = [
    {
      id: "All",
      icon: "�️",
      title: "All Plans",
      description: "View recipes from all meal plans",
    },
    {
      id: "Weight Loss",
      icon: "⚖️",
      title: "Weight Loss",
      description: "Lower calorie meals with balanced nutrition",
    },
    {
      id: "Muscle Gain",
      icon: "💪",
      title: "Muscle Gain",
      description: "High protein meals for muscle building",
    },
    {
      id: "Performance",
      icon: "�",
      title: "Performance",
      description: "Balanced meals for optimal performance",
    },
  ];

  return (
    <div className="sidebar-section plan-filter">
      <h3>Fitness Plans</h3>
      {plans.map((plan) => (
        <button
          key={plan.id}
          className={`fitness-plan-button ${
            selectedPlan === plan.id ? "active" : ""
          }`}
          onClick={() => onPlanChange(plan.id)}
        >
          <span className="plan-icon">{plan.icon}</span>
          <div className="plan-info">
            <span className="plan-title">{plan.title}</span>
            <span className="plan-description">{plan.description}</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default PlanFilter;
