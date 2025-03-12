import React from "react";
import NavbarLogin from "../../components/NavbarLogin/NavbarLogin";
import HeroLogin from "../../components/HeroLogin/HeroLogin";
import Nutrition from "../../components/Nutrition/Nutrition";
import ExploreLogin from "../../components/ExploreLogin/ExploreLogin";
import Faq from "../../components/FaqLogin/FaqLogin";
import Testimonials from "../../components/Testimonials/Testimonials";
import FooterLogin from "../../components/FooterLogin/FooterLogin";

function LoggedIn({ setIsLoggedIn }) {
  return (
    <div>
      <NavbarLogin setIsLoggedIn={setIsLoggedIn} />
      <HeroLogin />
      <Nutrition />
      <ExploreLogin />
      <Faq />
      <Testimonials />
      <FooterLogin />
    </div>
  );
}

export default LoggedIn;
