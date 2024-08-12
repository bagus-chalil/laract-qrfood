import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/Components/Navbar/Navbar";
import Hero from "@/Components/Hero/Hero";
import Footer from "@/Components/Footer/Footer";
import { Head } from "@inertiajs/react";
import Order from "@/Components/Order/Order";

const OrderFood = ({categories, reservationMenu, kode_referal}) => {
    console.log(categories, reservationMenu, kode_referal);

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
      <Order categories={categories} reservationMenu={reservationMenu} kode_referal={kode_referal}/>
      <Footer />
    </div>
  );
};

export default OrderFood;
