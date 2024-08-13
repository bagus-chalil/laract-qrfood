import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/Components/Navbar/Navbar";
import Hero from "@/Components/Hero/Hero";
import Footer from "@/Components/Footer/Footer";
import { Head } from "@inertiajs/react";
import Alert from "@/Components/Alert";

const LandingLayout = ({ children }) => {

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
      <Head title="Pemesanan" />
      <Alert />
      <Navbar />
      <Hero />
      <div>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default LandingLayout;
