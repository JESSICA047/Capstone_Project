import React, { useState } from "react";
import "./Faq.css";

const FaqItem = ({ faq, index, toggleFAQ }) => {
  return (
    <div
      className={"faq " + (faq.open ? "open" : "")}
      key={index}
      onClick={() => toggleFAQ(index)}
    >
      <div className="faq-question">{faq.question}</div>
      <div className="faq-answer">{faq.answer}</div>
    </div>
  );
};

function Faq() {
  const [faqs, setFaqs] = useState([
    {
      question: "What is a meal planner , and how does it work ?",
      answer:
        "A meal plan is tool that can help you and organize your meal in advance. Our meal planner for bodybuilders providers personalized meal plan tailored to your fitness goals and dietary needs.",
      open: true,
    },
    {
      question:
        "Do i need to have a specific fitness goal to use meal planner?",
      answer:
        "No, but having a specific goal in mind (e.g., bulking, cutting, maintaining) well help us provide a more tailored meal plan.",
      open: false,
    },
    {
      question:
        "Can I customize the meal plan to suit my dietary preferences (e.g, vegan, gluten-free)?",
      answer:
        "A meal plan is tool that can help you and organize your meal in advance. Our meal planner for bodybuilders providers personalized meal plan tailored to your fitness goals and dietary needs.",
      open: false,
    },
    {
      question:
        "How often will I need to eat, and what portion sizes should I follow?",
      answer:
        "Our meal plans are designed by registered dietitians and nutritionists who ensure that each meal plan meet the nutrition need of bodybuilders.",
      open: false,
    },
  ]);

  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }
        return faq;
      })
    );
  };

  return (
    <div>
      <div className="faq-title">
        <h2>Frequently Asked Questions</h2>
        <p>
          {" "}
          Get Answers to All Your Burning Questions About Bodybuilding
          Nutrition, Meal
        </p>
        <p>
          Supplementation, and More. Our AI Doctor is Here to Guide You to
          Optimal Results.
        </p>
      </div>
      <div className="faqs">
        {faqs.map((faq, index) => (
          <FaqItem faq={faq} index={index} key={index} toggleFAQ={toggleFAQ} />
        ))}
      </div>
    </div>
  );
}

export default Faq;
