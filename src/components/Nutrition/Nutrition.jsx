import React from "react";
import { assets } from "../../assets/assets";
import "./Nutrition.css";

function Nutrition() {
  return (
    <section className="nutrition-section">
      <div className="nutrition-main">
        {/* Left Side: Bowl and Floating Ingredients */}
        <div className="nutrition-left">
          <div className="under-bowl">
          <img
              src={assets.tomato}
              alt="Grass"
              className="floating floating4"
            />
            <img
              src={assets.grass}
              alt="Grass"
              className="floating floating1"
            />
            <img
              src={assets.pepper}
              alt="Pepper"
              className="floating floating2"
            />
            <img
              src={assets.bell_pepper}
              alt="Bell Pepper"
              className="floating floating3"
            />
            <img
              src={assets.spring_onion}
              alt="Spring Onion"
              className="floating floating4"
            />
            <img src={assets.fish} alt="Fish" className="floating floating5" />
            <img src={assets.salt} alt="salt" className="floating floating6" />
          </div>
          <div className="bowl">
            <img src={assets.salad} alt="Salad Bowl" className="rotating" />
          </div>
        </div>

        {/* Right Side Content */}
        <div className="nutrition-right">
          <h1>Balanced Nutrition</h1>
          <p>
            Each meal is designed to provide the necessary nutrients and calorie
            intake to support muscle growth and overall health.
          </p>
          <p>
            The meal plan offers a diverse selection of protein sources,
            including lean meat, fish, and eggs.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Nutrition;
