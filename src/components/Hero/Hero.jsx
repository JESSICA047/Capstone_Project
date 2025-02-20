import React from "react";
import "./Hero.css";
import { assets } from "../../assets/assets";

function Hero() {
  return (
    <div className="hero-main">
      <div className="hero-left">
        <h1>Transform Your Body With Customized Meal Plans</h1>
        <p id="text">
          Fuel Your Body for Maximum Muscle Growth with Our Tailored Nutrition
          Plans
        </p>
        <button id="get">Get Started</button>
        <button id="learn">Learn More</button>
        <div className="hero-card">
          <div className="left">
            <div className="image">
              <img src={assets.massive_legs} alt="" />
            </div>
            <div className="text">
              <h3>Maximize Muscle</h3>
              <p>Our Expertly Crafted Meal Plans Provided</p>
            </div>
          </div>
          <div className="right">
            <div className="image">
              <img src={assets.pelvic} alt="" />
            </div>
            <div className="text">
              <h3>Optimize</h3>
              <p>Nutrition-Dense Meals to Shed Fat </p>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-right">
        <img src={assets.strong_man} alt="" />
      </div>
    </div>
  );
}

export default Hero;
