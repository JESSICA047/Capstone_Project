import React from "react";
import "./NutritionTip.css";

const NutritionTip = ({
  title,
  content,
  image,
  category,
  date,
  source,
  url,
}) => {
  const handleReadMore = () => {
    // Open link in new tab
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="nutrition-tip">
      <div className="nutrition-tip-image">
        <img src={image} alt={title} />
        <span className="nutrition-tip-category">{category}</span>
      </div>
      <div className="nutrition-tip-content">
        <h2>{title}</h2>
        <div className="nutrition-tip-date">{date}</div>
        <p>{content}</p>
        <div className="tip-meta">
          {source && <span className="tip-source">Source: {source}</span>}
        </div>
        {url && (
          <button className="read-more-btn" onClick={handleReadMore}>
            Read Full Article
          </button>
        )}
      </div>
    </div>
  );
};

export default NutritionTip;
