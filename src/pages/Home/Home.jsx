import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Nutrition from "../../components/Nutrition/Nutrition";
import Explore from "../../components/Explore/Explore";
import Faq from "../../components/Faq/Faq";
import Testimonials from "../../components/Testimonials/Testimonials";
import Footer from "../../components/Footer/Footer";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <Navbar />
      <Hero />
      <Nutrition />
      <Explore />
      <Faq />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default Home;
