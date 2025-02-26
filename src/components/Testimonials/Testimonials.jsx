import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import "./Testimonials.css";

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      image: assets.happy_armpit,
      name: "Jessica M",
      testimonial:
        "I've tried countless meal plans over the years, but none have been as effective as this one. In just three months, I've gained lean muscle, reduced my body fat percentage, and my energy levels are through the roof! The meal plan is simple to follow, and the results speak for themselves.",
    },
    {
      id: 2,
      image: assets.hand_cheeks,
      name: "John K",
      testimonial:
        "This program transformed my diet and lifestyle completely. I've never felt better! The meal plan is easy to follow and the results are incredible.",
    },
    {
      id: 3,
      image: assets.marsai,
      name: "Emily Mikayla",
      testimonial:
        "I love how easy it is to follow this plan. The results have been amazing! I've seen significant improvements in my health and fitness.",
    },
    {
      id: 4,
      image: assets.six_packs,
      name: "Chris B",
      testimonial:
        "In just three months, I've gained lean muscle, reduced my body fat percentage, and my energy levels are through the roof! The meal plan is simple to follow and effective.",
    },
    {
      id: 5,
      image: assets.dumb_bell,
      name: "Sarah M",
      testimonial:
        "I've tried countless meal plans over the years, but none have been as effective as this one. The results speak for themselves and I couldn't be happier.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="testimonials-container">
      <div className="carousel-container">
        <div className="carousel">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`carousel-item ${
                index === activeIndex ? "active" : ""
              }`}
            >
              <img src={testimonial.image} alt={testimonial.name} />
              <p className="name">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="testimonial-text">
        <h2>Testimonials</h2>
        <p>{testimonials[activeIndex].testimonial}</p>
      </div>
    </div>
  );
}

export default Testimonials;
