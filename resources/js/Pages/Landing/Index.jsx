import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/Components/Navbar/Navbar";
import Hero from "@/Components/Hero/Hero";
import Services from "@/Components/Services/Services";
import Banner from "@/Components/Banner/Banner";
import AppStore from "@/Components/AppStore/AppStore";
import Testimonial from "@/Components/Testimonial/Testimonial";
import Footer from "@/Components/Footer/Footer";
import { Head } from "@inertiajs/react";
import Map from "@/Components/Map/Map";

const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <Head title="QRFood" />
      <Navbar />
      <Hero />
      <Services />
      <Banner />
      {/* <CoverBanner /> */}
      {/* <AppStore /> */}
      <Map />
      {/* <Testimonial /> */}
      <Footer />
    </div>
  );
};

export default App;
