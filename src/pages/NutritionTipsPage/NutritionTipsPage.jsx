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
        "Drink at least 8 glasses of water a day. Water is essential for maintaining body temperature, removing waste products, and transporting nutrients throughout your body.",
      category: "Wellness",
      date: "March 15, 2025",
      source: "Mayo Clinic",
      url: "https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/water/art-20044256",
    },
    {
      image:
        "https://images.unsplash.com/photo-1457530378978-8bac673b8062?q=80&w=2070&auto=format&fit=crop",
      title: "Eat the Rainbow",
      content:
        "Include colorful fruits and vegetables in your diet. Different colors indicate different nutrients - greens are rich in iron, reds have lycopene, oranges are full of vitamin C.",
      category: "Nutrition Basics",
      date: "March 10, 2025",
      source: "Harvard Health",
      url: "https://www.health.harvard.edu/blog/phytonutrients-paint-your-plate-with-the-colors-of-the-rainbow-2019042516501",
    },
    {
      image:
        "https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?q=80&w=1964&auto=format&fit=crop",
      title: "Mindful Eating",
      content:
        "Practice mindful eating by sitting down at a table, avoiding distractions, and chewing slowly. This helps with better digestion and prevents overeating.",
      category: "Wellness",
      date: "March 5, 2025",
      source: "Cleveland Clinic",
      url: "https://health.clevelandclinic.org/mindful-eating/",
    },
    {
      image:
        "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?q=80&w=2070&auto=format&fit=crop",
      title: "Protein Power",
      content:
        "Include lean protein sources in every meal. Good options include fish, chicken, legumes, eggs, and tofu. Protein helps build and repair tissues.",
      category: "Muscle Building",
      date: "March 1, 2025",
      source: "American Heart Association",
      url: "https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/nutrition-basics/meat-fish-and-poultry",
    },
    {
      image:
        "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop",
      title: "Healthy Fats",
      content:
        "Don't fear fats - choose healthy sources like avocados, nuts, olive oil, and fatty fish. These fats are essential for brain health and nutrient absorption.",
      category: "Nutrition Basics",
      date: "February 25, 2025",
      source: "Academy of Nutrition and Dietetics",
      url: "https://www.eatright.org/health/wellness/heart-and-cardiovascular-health/choose-healthy-fats",
    },
    {
      image:
        "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?q=80&w=2070&auto=format&fit=crop",
      title: "Fiber Focus",
      content:
        "Incorporate high-fiber foods like whole grains, beans, fruits, and vegetables into your meals. Fiber aids digestion and helps maintain healthy cholesterol levels.",
      category: "Digestive Health",
      date: "February 20, 2025",
      source: "NIH",
      url: "https://www.niddk.nih.gov/health-information/digestive-diseases/digestive-system-how-it-works",
    },
    {
      image:
        "https://images.unsplash.com/photo-1447195047884-0f014b0d9288?q=80&w=2070&auto=format&fit=crop",
      title: "Healthy Weight Management",
      content:
        "Focus on sustainable habits rather than quick fixes. A balanced diet with portion control and regular physical activity is key to maintaining a healthy weight.",
      category: "Weight Loss",
      date: "February 15, 2025",
      source: "CDC",
      url: "https://www.cdc.gov/healthyweight/losing_weight/index.html",
    },
    {
      image:
        "https://images.unsplash.com/photo-1505252585461-04db1eb84625?q=80&w=1976&auto=format&fit=crop",
      title: "Gut Health 101",
      content:
        "Support your gut microbiome with fermented foods like yogurt, kefir, sauerkraut, and kimchi. A healthy gut microbiome supports overall health and immunity.",
      category: "Digestive Health",
      date: "February 10, 2025",
      source: "Johns Hopkins Medicine",
      url: "https://www.hopkinsmedicine.org/health/wellness-and-prevention/your-digestive-system-5-ways-to-support-gut-health",
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
                    source={tip.source}
                    url={tip.url}
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
