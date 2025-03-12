import React from "react";
import "./RecipeItem.css";

const RecipeItem = ({ id, name, description, image, category }) => {
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={image} alt={name} className="food-item-image" />
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
        </div>
        <p className="food-item-desc">{description}</p>
        <div className="food-item-categories">
          {category.map((cat, index) => (
            <span key={index} className="category-tag">
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeItem;
