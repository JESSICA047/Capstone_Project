import React, { useState } from "react";
import NutritionTip from "../../components/NutritionTip/NutritionTip";
import { assets } from "../../assets/assets";
import NavbarLogin from "../../components/NavbarLogin/NavbarLogin";
import FooterLogin from "../../components/FooterLogin/FooterLogin";
import "./NutritionTipsPage.css";

const NutritionTipsPage = () => {
  // Define activeCategory state ONCE
  const [activeCategory, setActiveCategory] = useState("All");

  const tips = [
    {
      image:
        "https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=1965&auto=format&fit=crop",
      title: "Stay Hydrated",
      content:
        "Drink at least 8 glasses of water a day. Water is essential for maintaining body temperature, removing waste products, and transporting nutrients throughout your body. Proper hydration also helps maintain cognitive function and supports your metabolism.",
      category: "Wellness",
      date: "March 15, 2025",
    },
    {
      image:
        "https://images.unsplash.com/photo-1457530378978-8bac673b8062?q=80&w=2070&auto=format&fit=crop",
      title: "Eat the Rainbow",
      content:
        "Include colorful fruits and vegetables in your diet. Different colors indicate different nutrients - greens are rich in iron, reds have lycopene, oranges are full of vitamin C, and purples contain antioxidants. Aim for at least 5 servings of different colored produce each day.",
      category: "Nutrition Basics",
      date: "March 10, 2025",
    },
    {
      image:
        "https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?q=80&w=1964&auto=format&fit=crop",
      title: "Mindful Eating",
      content:
        "Practice mindful eating by sitting down at a table, avoiding distractions, and chewing slowly. This helps with better digestion and prevents overeating. Pay attention to hunger and fullness cues, and appreciate the flavors and textures of your food.",
      category: "Wellness",
      date: "March 5, 2025",
    },
    {
      image:
        "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?q=80&w=2070&auto=format&fit=crop",
      title: "Protein Power",
      content:
        "Include lean protein sources in every meal. Good options include fish, chicken, legumes, eggs, and tofu. Protein helps build and repair tissues and keeps you feeling full longer. For plant-based diets, combine different plant proteins to ensure you get all essential amino acids.",
      category: "Muscle Building",
      date: "March 1, 2025",
    },
    {
      image:
        "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop",
      title: "Healthy Fats",
      content:
        "Don't fear fats - choose healthy sources like avocados, nuts, olive oil, and fatty fish. These fats are essential for brain health and nutrient absorption. They also help keep your skin healthy and support hormone production in your body.",
      category: "Nutrition Basics",
      date: "February 25, 2025",
    },
    {
      image:
        "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?q=80&w=2070&auto=format&fit=crop",
      title: "Fiber Focus",
      content:
        "Incorporate high-fiber foods like whole grains, beans, fruits, and vegetables into your meals. Fiber aids digestion, helps maintain healthy cholesterol levels, and keeps you feeling satisfied. Aim for at least 25-30 grams of fiber daily from a variety of sources.",
      category: "Digestive Health",
      date: "February 20, 2025",
    },
  ];

  // Filter tips based on active category
  const filteredTips =
    activeCategory === "All"
      ? tips
      : tips.filter((tip) => tip.category === activeCategory);

  // Handler for category selection
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <>
      <NavbarLogin />
      <div className="nutrition-tips-page">
        {/* New header that matches Recipe and Meal Plan pages */}
        <div className="nutrition-tips-header">
          <img
            src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=2032&auto=format&fit=crop"
            alt="Nutrition Header"
            className="nutrition-tips-header-image"
          />
          <div className="nutrition-tips-header-content">
            <h1>Nutritional Tips & Articles</h1>
            <p>
              Stay updated with expert advice, science-backed nutrition
              insights, and inspiring stories to fuel your health and fitness
              journey.
            </p>
          </div>
        </div>

        <div className="nutrition-tips-container">
          <div className="tips-filter">
            <h3>Categories</h3>
            <ul className="category-list">
              <li
                className={`category-item ${
                  activeCategory === "All" ? "active" : ""
                }`}
                onClick={() => handleCategoryChange("All")}
              >
                All Articles
              </li>
              <li
                className={`category-item ${
                  activeCategory === "Nutrition Basics" ? "active" : ""
                }`}
                onClick={() => handleCategoryChange("Nutrition Basics")}
              >
                Nutrition Basics
              </li>
              <li
                className={`category-item ${
                  activeCategory === "Muscle Building" ? "active" : ""
                }`}
                onClick={() => handleCategoryChange("Muscle Building")}
              >
                Muscle Building
              </li>
              <li
                className={`category-item ${
                  activeCategory === "Wellness" ? "active" : ""
                }`}
                onClick={() => handleCategoryChange("Wellness")}
              >
                Wellness
              </li>
              <li
                className={`category-item ${
                  activeCategory === "Weight Loss" ? "active" : ""
                }`}
                onClick={() => handleCategoryChange("Weight Loss")}
              >
                Weight Loss
              </li>
              <li
                className={`category-item ${
                  activeCategory === "Digestive Health" ? "active" : ""
                }`}
                onClick={() => handleCategoryChange("Digestive Health")}
              >
                Digestive Health
              </li>
            </ul>
          </div>

          <div className="tips-body">
            <h2>
              {activeCategory === "All"
                ? "Latest Articles"
                : `${activeCategory} Articles`}
            </h2>
            <div className="tips-grid">
              {filteredTips.length > 0 ? (
                filteredTips.map((tip, index) => (
                  <NutritionTip
                    key={index}
                    title={tip.title}
                    content={tip.content}
                    image={tip.image}
                    category={tip.category}
                    date={tip.date}
                  />
                ))
              ) : (
                <div className="no-tips-message">
                  <p>No articles found in this category.</p>
                  <p>Check back soon for more content!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <FooterLogin />
    </>
  );
};

export default NutritionTipsPage;
