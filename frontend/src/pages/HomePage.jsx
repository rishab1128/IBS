import React from "react";
import Info from "../components/Info";
import HomeFooter from "../components/HomeFooter";
import Hero from "../components/Hero";
import HomeNavbar from "../components/HomeNavbar";
import Newsletter from "../components/Newsletter";

function HomePage2() {
  return (
    <div>
      <HomeNavbar />
      <Hero />
      <Info />
      <Newsletter />
      <HomeFooter />
    </div>
  );
}

export default HomePage2;
