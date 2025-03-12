import React from "react";
import NutritionTip from "../../components/NutritionTip/NutritionTip";
import "./../../components/NutritionTip/NutritionTip.css";
import { assets } from "../../assets/assets";
import NavbarLogin from "../../components/NavbarLogin/NavbarLogin";
import Footer from "../../components/Footer/Footer";

const NutritionTipsPage = () => {
  const tips = [
    {
      image: assets.lemon_article,
      title: "Stay Hydrated",
      content:
        "Drink at least 8 glasses of water a day. Water is essential for maintaining body temperature, removing waste products, and transporting nutrients throughout your body. Proper hydration also helps maintain cognitive function and supports your metabolism.",
    },
    {
      image: assets.lemon_article,
      title: "Eat the Rainbow",
      content:
        "Include colorful fruits and vegetables in your diet. Different colors indicate different nutrients - greens are rich in iron, reds have lycopene, oranges are full of vitamin C, and purples contain antioxidants. Aim for at least 5 servings of different colored produce each day.",
    },
    {
      image: assets.lemon_article,
      title: "Mindful Eating",
      content:
        "Practice mindful eating by sitting down at a table, avoiding distractions, and chewing slowly. This helps with better digestion and prevents overeating. Pay attention to hunger and fullness cues, and appreciate the flavors and textures of your food.",
    },
    {
      image: assets.lemon_article,
      title: "Protein Power",
      content:
        "Include lean protein sources in every meal. Good options include fish, chicken, legumes, eggs, and tofu. Protein helps build and repair tissues and keeps you feeling full longer. For plant-based diets, combine different plant proteins to ensure you get all essential amino acids.",
    },
    {
      image: assets.lemon_article,
      title: "Healthy Fats",
      content:
        "Don't fear fats - choose healthy sources like avocados, nuts, olive oil, and fatty fish. These fats are essential for brain health and nutrient absorption. They also help keep your skin healthy and support hormone production in your body.",
    },
    {
      image: assets.lemon_article,
      title: "Fiber Focus",
      content:
        "Incorporate high-fiber foods like whole grains, beans, fruits, and vegetables into your meals. Fiber aids digestion, helps maintain healthy cholesterol levels, and keeps you feeling satisfied. Aim for at least 25-30 grams of fiber daily from a variety of sources.",
    },
  ];

  return (
    <>
      <NavbarLogin />
      <div className="nutrition-tips-page">
        <div className="tips-title">
          <img src={assets.nutrition} alt="Nutrition icon" />
          <p>
            Stay updated with expert tips, bodybuilding nutrition insights, and
            inspiring stories from our community.
          </p>
        </div>
        <div className="nutrition-tips-container">
          <div className="tips-body">
            <h1>Latest Articles</h1>
            <div className="tips-grid">
              {tips.map((tip, index) => (
                <NutritionTip
                  key={index}
                  title={tip.title}
                  content={tip.content}
                  image={tip.image}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NutritionTipsPage;
