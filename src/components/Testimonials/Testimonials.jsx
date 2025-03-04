import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { assets } from "../../assets/assets";
import "./Testimonials.css";

const testimonials = [
  {
    id: 1,
    image: assets.happy_armpit,
    name: "Jessica M",
    testimonial:
      "This meal plan has completely transformed my bodybuilding journey. The balanced nutrition and delicious recipes keep me fueled and satisfied throughout the day. I've seen significant improvements in my strength and endurance, and I couldn't be happier with the progress I've made.",
  },
  {
    id: 2,
    image: assets.hand_cheeks,
    name: "John K",
    testimonial:
      "I've tried countless meal plans over the years, but none have been as effective as this one. In just three months, I've gained lean muscle, reduced my body fat percentage, and my energy levels are through the roof! The meal plan is simple to follow, and the results speak for themselves.",
  },
  {
    id: 3,
    image: assets.marsai,
    name: "Emily Mikayla",
    testimonial:
      "I can't say enough good things about this meal plan. The results have been incredible—I've gained muscle, lost fat, and my recovery time has improved dramatically. The recipes are tasty and easy to prepare, making it a sustainable option for long-term success. Thank you for creating such an effective plan!",
  },
  {
    id: 4,
    image: assets.six_packs,
    name: "Chris B",
    testimonial:
      "What sets this meal plan apart is the attention to detail and the focus on real, wholesome ingredients. I've been able to build muscle while staying lean and healthy. The plan is customizable, which makes it easy to fit into my busy lifestyle. A must-try for any serious bodybuilder!",
  },
  {
    id: 5,
    image: assets.dumb_bell,
    name: "Sarah M",
    testimonial:
      "I was struggling to find a meal plan that catered to my bodybuilding goals without feeling restricted. This plan has been a game-changer! It's easy to follow, and the meals are delicious and satisfying. I've seen impressive gains in muscle mass and overall strength.",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex >= testimonials.length ? 0 : nextIndex;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getVisibleTestimonials = () => {
    let items = [];
    const totalItems = testimonials.length;

    for (let i = -2; i <= 2; i++) {
      let index = activeIndex + i;

      // Handle circular navigation
      if (index < 0) index = totalItems + index;
      if (index >= totalItems) index = index - totalItems;

      items.push({
        ...testimonials[index],
        position: i,
      });
    }

    return items;
  };

  return (
    <div className="testimonials-container">
      <div className="carousel-section">
        <div className="carousel-container">
          <div className="carousel">
            {getVisibleTestimonials().map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className={`carousel-item ${
                  testimonial.position === 0 ? "active" : ""
                }`}
                initial={false}
                animate={{
                  x: `${testimonial.position * 100}%`,
                  scale: testimonial.position === 0 ? 1.2 : 0.8,
                  opacity: testimonial.position === 0 ? 1 : 0.6,
                  zIndex: testimonial.position === 0 ? 5 : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="text-section"
        key={activeIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="testimonial-text">
          <h2>Testimonials</h2>
          <p>{testimonials[activeIndex].testimonial}</p>
          <p className="mt-4 font-semibold">
            - {testimonials[activeIndex].name}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
