import React from "react";
import "./NutritionTip.css";

const NutritionTip = ({ title, content, image }) => {
  return (
    <div className="nutrition-tip">
      <img src={image} alt={title} />
      <div className="nutrition-tip-content">
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default NutritionTip;
