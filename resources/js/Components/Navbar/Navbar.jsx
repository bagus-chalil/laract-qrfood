import React from "react";
const Logo = "/assets/img/food-logo.png";
import { FaCartShopping } from "react-icons/fa6";
import DarkMode from "./DarkMode";
import { Link, usePage } from "@inertiajs/react";

const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/#home",
  },
  {
    id: 2,
    name: "Services",
    link: "/#services",
  },
  {
    id: 3,
    name: "Alur Pemesanan",
    link: "/#flow",
  },
];
const Navbar = () => {
    const { auth } = usePage().props;

  return (
    <>
      <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200">
        <div className="container py-3 sm:py-0">
          <div className="flex justify-between items-center">
            <div>
              <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
                <img src={Logo} alt="Logo" className="w-10" />
                QRFood
              </a>
            </div>
            <div className="flex justify-between items-center gap-4">
              <div>
                <DarkMode />
              </div>
              <ul className="hidden sm:flex items-center gap-4">
                {Menu.map((menu) => (
                  <li key={menu.id}>
                    <a
                      href={menu.link}
                      className="inline-block py-4 px-4 hover:text-blue-500"
                    >
                      {menu.name}
                    </a>
                  </li>
                ))}
              </ul>
              <button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:scale-105 duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3">
                {!auth.user ? (
                    <Link href="/login">Login</Link>
                ) : (
                    auth.user.roles.includes("Admin") ? (
                    <Link href="/dashboard">Login</Link>
                    ) : (
                    <Link href="/home">Login</Link>
                    )
                )}
                {/* <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" /> */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
