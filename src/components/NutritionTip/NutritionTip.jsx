import React from "react";
import "./NutritionTip.css";

const NutritionTip = ({ title, content, image, category, date }) => {
  return (
    <div className="nutrition-tip">
      <div className="nutrition-tip-image">
        <img src={image} alt={title} />
        {category && <span className="nutrition-tip-category">{category}</span>}
      </div>
      <div className="nutrition-tip-content">
        <h2>{title}</h2>
        {date && <span className="nutrition-tip-date">{date}</span>}
        <p>{content}</p>
        <button className="read-more-btn">Read More</button>
      </div>
    </div>
  );
};

export default NutritionTip;
