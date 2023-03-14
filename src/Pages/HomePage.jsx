import React from "react";
import Navbar from "../components/NavBar";
import InfoBar from "../components/InfoBar";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Services from "../components/Services";
import DownloadAppBanner from "../components/DownloadAppBanner";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <InfoBar />
      <Slider />
      <Categories />
      <Services />
      <DownloadAppBanner />
      <Footer />
    </>
  );
};

export default HomePage;
