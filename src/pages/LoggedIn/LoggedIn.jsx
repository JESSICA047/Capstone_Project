import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import NavbarLogin from "../../components/NavbarLogin/NavbarLogin";
import Faq from "../../components/Faq/Faq";
import Testimonials from "../../components/Testimonials/Testimonials";
import FooterLogin from "../../components/FooterLogin/FooterLogin";
import ExploreLogin from "../../components/ExploreLogin/ExploreLogin";
import { assets } from "../../assets/assets";
import "./LoggedIn.css";
import { useUserStats } from "../../contexts/UserStatsContext/UserStatsContext";

function LoggedIn({ setIsLoggedIn }) {
  const [scrollY, setScrollY] = useState(0);
  const [userName, setUserName] = useState("");
  const [activeSection, setActiveSection] = useState("explore");
  const [showWelcome, setShowWelcome] = useState(true);
  const { userStats, updateStat } = useUserStats();

  // Update the useEffect hook that handles the welcome animation:

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    setUserName(userData.name || "Fitness Enthusiast");

    // Check if this is the first visit after login
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");

    if (!hasSeenWelcome) {
      // First visit after login - show welcome and set flag
      setShowWelcome(true);
      // Hide welcome animation after 3 seconds
      const timer = setTimeout(() => {
        setShowWelcome(false);
        localStorage.setItem("hasSeenWelcome", "true");
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      // Already seen welcome - don't show it
      setShowWelcome(false);
    }

    // Track scroll for parallax effects
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Calculate time of day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Add these functions to your LoggedIn component:

  // Helper function to update any stat
  const updateUserStat = (statName, value) => {
    setUserStats((prev) => {
      const newStats = {
        ...prev,
        [statName]: value,
      };
      // Save to localStorage
      localStorage.setItem("userStats", JSON.stringify(newStats));
      return newStats;
    });
  };

  // Export these functions to be used in other components
  const incrementMealsPlanned = () => {
    updateUserStat("mealsPlanned", userStats.mealsPlanned + 1);
  };

  const incrementRecipesBookmarked = () => {
    updateUserStat("recipesBookmarked", userStats.recipesBookmarked + 1);
  };

  return (
    <div className="logged-in-page">
      <NavbarLogin setIsLoggedIn={setIsLoggedIn} />
      {/* Hero Section with Parallax */}
      <section className="hero-section">
        <div
          className="hero-background"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <img src={assets.strong_man} alt="Fitness Background" />
          <div className="overlay-gradient"></div>
        </div>

        <motion.div
          className="hero-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1>
            {getGreeting()}, <span className="highlight">{userName}</span>
          </h1>
          <p className="hero-subtitle">
            Your personal nutrition and fitness journey continues
          </p>

          <div className="user-stats">
            <div className="stat-card">
              <div className="stat-number">{userStats.mealsPlanned}</div>
              <div className="stat-label">Meals Planned</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{userStats.recipesBookmarked}</div>
              <div className="stat-label">Saved Recipes</div>
            </div>
          </div>

          <div className="hero-cta">
            <Link to="/loggedin/meal-plans">
              <motion.button
                className="cta-button primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Plan My Meals
              </motion.button>
            </Link>
            <Link to="/loggedin/recipes">
              <motion.button
                className="cta-button secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Recipes
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
      {/* Interactive Navigation Tabs  */}
      <section className="interactive-tabs">
        <div className="tab-container">
          <button
            className={`tab-button ${
              activeSection === "nutrition" ? "active" : ""
            }`}
            onClick={() => setActiveSection("nutrition")}
          >
            <i className="tab-icon nutrition-icon"></i>
            Nutrition Insights
          </button>
          <button
            className={`tab-button ${
              activeSection === "explore" ? "active" : ""
            }`}
            onClick={() => setActiveSection("explore")}
          >
            <i className="tab-icon explore-icon"></i>
            Meal Categories
          </button>
          <button
            className={`tab-button ${
              activeSection === "testimonials" ? "active" : ""
            }`}
            onClick={() => setActiveSection("testimonials")}
          >
            <i className="tab-icon testimonials-icon"></i>
            Success Stories
          </button>
          <button
            className={`tab-button ${activeSection === "faq" ? "active" : ""}`}
            onClick={() => setActiveSection("faq")}
          >
            <i className="tab-icon faq-icon"></i>
            FAQs
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="tab-content"
          >
            {activeSection === "nutrition" && <NutritionSection />}
            {activeSection === "explore" && <ExploreLogin />}
            {activeSection === "testimonials" && <Testimonials />}
            {activeSection === "faq" && <Faq />}
          </motion.div>
        </AnimatePresence>
      </section>
      {/* Recommended Plan Call-to-Action */}
      <section className="recommended-plan">
        <motion.div
          className="plan-card"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="plan-content">
            <h2>Recommended For You</h2>
            <h3>Muscle Building Meal Plan</h3>
            <p>
              Based on your profile and goals, we've created a customized plan
              to help you build lean muscle while maintaining optimal nutrition.
            </p>
            <ul className="plan-features">
              <li>
                <span className="check-icon">✓</span> High-protein recipes
                tailored to your needs
              </li>
              <li>
                <span className="check-icon">✓</span> Balanced macronutrients
                for optimal results
              </li>
              <li>
                <span className="check-icon">✓</span> Simple meal prep
                instructions
              </li>
              <li>
                <span className="check-icon">✓</span> Shopping list included
              </li>
            </ul>
            <Link to="/loggedin/meal-plans">
              <motion.button
                className="view-plan-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Your Plan
              </motion.button>
            </Link>
          </div>
          <div className="plan-image">
            <img src={assets.fitness} alt="Muscle Building Plan" />
            <div className="floating-badge">
              <span>Personalized</span>
            </div>
          </div>
        </motion.div>
      </section>
      <FooterLogin />
    </div>
  );
}

// Nutrition Section Component
const NutritionSection = () => {
  return (
    <div className="nutrition-content">
      <div className="nutrition-main">
        <div className="nutrition-left">
          <div className="bowl-container">
            <div className="bowl">
              <img src={assets.salad} alt="Salad Bowl" className="rotating" />
            </div>
            <div className="ingredients">
              <img
                src={assets.tomato}
                alt="Tomato"
                className="ingredient ingredient-1"
              />
              <img
                src={assets.grass}
                alt="Grass"
                className="ingredient ingredient-2"
              />
              <img
                src={assets.pepper}
                alt="Pepper"
                className="ingredient ingredient-3"
              />
              <img
                src={assets.bell_pepper}
                alt="Bell Pepper"
                className="ingredient ingredient-4"
              />
              <img
                src={assets.spring_onion}
                alt="Spring Onion"
                className="ingredient ingredient-5"
              />
              <img
                src={assets.fish}
                alt="Fish"
                className="ingredient ingredient-6"
              />
            </div>
          </div>
        </div>

        <div className="nutrition-right">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2>Ultimate Nutrition</h2>
            <p>
              Our meal plans are scientifically designed to provide the optimal
              balance of macronutrients and micronutrients your body needs.
            </p>

            <div className="nutrition-highlights">
              <div className="highlight-item">
                <div className="highlight-icon protein-icon">🍗</div>
                <div className="highlight-text">
                  <h3>Protein-Packed</h3>
                  <p>
                    Build and repair muscles with our high-protein meal options
                  </p>
                </div>
              </div>

              <div className="highlight-item">
                <div className="highlight-icon carbs-icon">🍚</div>
                <div className="highlight-text">
                  <h3>Smart Carbs</h3>
                  <p>
                    Complex carbohydrates for sustained energy throughout the
                    day
                  </p>
                </div>
              </div>

              <div className="highlight-item">
                <div className="highlight-icon fats-icon">🥑</div>
                <div className="highlight-text">
                  <h3>Healthy Fats</h3>
                  <p>
                    Essential fatty acids to support hormone production and cell
                    health
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoggedIn;
