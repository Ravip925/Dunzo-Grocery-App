import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import InfoBar from "../components/InfoBar";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Services from "../components/Services";
import DownloadAppBanner from "../components/DownloadAppBanner";
import Footer from "../components/Footer";

const HomePage = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <Navbar />
      <InfoBar />
      <Slider screenWidth={screenWidth} />
      <Categories />
      <Services />
      <DownloadAppBanner />
      <Footer />
    </>
  );
};

export default HomePage;
