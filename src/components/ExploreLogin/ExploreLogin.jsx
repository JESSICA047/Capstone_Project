import React, { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./ExploreLogin.css";

function ExploreLogin() {
  // State to track hover for each card
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="explore">
      <div className="explore-2">
        <div className="explore-title">
          <h2>Explore Our Delicious and Nutritious Recipes</h2>
          <p>
            Discover a variety of healthy recipes that cater to your dietary
            needs. From breakfast to dinner, our recipes are designed to support
            your fitness goals and promote a balanced lifestyle.
          </p>
        </div>

        <div className="card">
          {/* Breakfast Card */}
          <div className="card1">
            <img src={assets.oats} alt="" />
            <div className="card-text">
              <h3>BREAKFAST</h3>
              <p>
                Start your day with our nutritious breakfast recipes. Each meal
                is designed to provide sustained energy and essential nutrients
                to power you through the morning.
              </p>
              <Link to="/loggedin/recipes">
                <button>Browse Recipes</button>
              </Link>
            </div>
          </div>

          {/*Lunch Card */}
          <div className="card2">
            <img src={assets.biriyani} alt="" />
            <div className="card-text">
              <h3>LUNCH</h3>
              <p>
                Our lunch recipes offer the perfect balance of proteins, carbs,
                and healthy fats to keep you energized and focused throughout
                your busy day.
              </p>
              <Link to="/loggedin/recipes">
                <button>Browse Recipes</button>
              </Link>
            </div>
          </div>

          {/* Supper Card */}
          <div className="card3">
            <img src={assets.fufu} alt="" />
            <div className="card-text">
              <h3>DINNER</h3>
              <p>
                End your day with our delicious dinner options that are both
                satisfying and nutritious, designed to support your body's
                overnight recovery.
              </p>
              <Link to="/loggedin/recipes">
                <button>Browse Recipes</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="explore-1">
        <div className="text">
          <div className="text-left">
            <h1>Explore Our Tailored Diet </h1>
            <h1> Plans For Every Need</h1>{" "}
          </div>
          <div className="text-right">
            <p>
              Discover a variety of diet plans designed to meet your specific
              health
            </p>
            <p>
              goals. Whether you're aiming for weight loss, muscle gain, or
              simply
            </p>
            <p>
              maintaining a balanced diet, our plans are crafted to suit your
            </p>
            <p>
              lifestyle and preferences. Embrace healthy eating with ease and
            </p>
            <p>enjoy the journey to a better you.</p>
          </div>
        </div>

        <div className="card">
          {/* Weight Loss Card */}
          <div className="card1">
            <img
              src={
                hoveredCard === "card1" ? assets.weight_loss : assets.fruit_man
              }
              alt=""
              onMouseEnter={() => setHoveredCard("card1")}
              onMouseLeave={() => setHoveredCard(null)}
            />
            <div className="card-text">
              <h3>Weight Loss Diet Plan</h3>
              <p>
                Our weight loss diet plan focuses on balanced nutrition, portion
                control, and sustainable eating habits to help you achieve your
                goals effectively.
              </p>
              <Link to="/loggedin/meal-plans">
                <button>Go to Meal Plan</button>
              </Link>
            </div>
          </div>

          {/* Muscle Gain Card */}
          <div className="card2">
            <img
              src={hoveredCard === "card2" ? assets.fitness : assets.vegan}
              alt=""
              onMouseEnter={() => setHoveredCard("card2")}
              onMouseLeave={() => setHoveredCard(null)}
            />
            <div className="card-text">
              <h3>Muscle Gain Diet Plan</h3>
              <p>
                Designed for those looking to build muscle, this plan includes
                high-protein meals and nutrient-rich food to support your
                fitness journey.
              </p>
              <Link to="/loggedin/meal-plans">
                <button>Go to Meal Plan</button>
              </Link>
            </div>
          </div>

          {/* Wellness Card */}
          <div className="card3">
            <img
              src={hoveredCard === "card3" ? assets.eating : assets.woman}
              alt=""
              onMouseEnter={() => setHoveredCard("card3")}
              onMouseLeave={() => setHoveredCard(null)}
            />
            <div className="card-text">
              <h3>Wellness Diet Plan</h3>
              <p>
                Our wellness diet plan promotes overall health with a focus on
                nutrient-dense foods, ensuring you feel your best every day.
              </p>
              <Link to="/loggedin/meal-plans">
                <button>Go to Meal Plan</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreLogin;
