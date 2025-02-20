import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Nutrition from "../../components/Nutrition/Nutrition";
import "./home.css"

function Home() {
  return (
    <div className="home">
      <Navbar />
      <Hero/>
      <Nutrition/>
    </div>
  );
}

export default Home;
