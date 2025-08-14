import React from 'react';
import Navbar from "@/Components/Navbar/Navbar";
import Hero from "@/Components/Hero/Hero";
import Services from "@/Components/Services/Services";
import Banner from "@/Components/Banner/Banner";
import Footer from "@/Components/Footer/Footer";
import Map from "@/Components/Map/Map";
import Alert from "@/Components/Alert";
import { Head } from '@inertiajs/react';
import ReferalRedeem from '@/Components/ReferalRedeem/ReferalRedeem';

const LandingIndex = () => {
    return (
        <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
            <Head title="Halaman Utama" />
            <Alert />
            <Navbar />
            <Hero />
            <ReferalRedeem />
            <Services />
            <Banner />
            <Map />
            <Footer />
        </div>
    );
};

export default LandingIndex;
