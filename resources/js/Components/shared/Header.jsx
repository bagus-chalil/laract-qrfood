import { Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
const Logo = "/assets/img/food-logo.png";

const Header = () => {
    const { auth } = usePage().props;
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>
                        <a href="/" className="flex ms-2 md:me-24">
                            <img src={Logo} alt="Logo" className="w-10" />
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">QRFood</span>
                        </a>
                    </div>
                    <div className="flex items-center">
                        <div className="relative">
                            <button
                                type="button"
                                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                aria-expanded={dropdownOpen}
                                onClick={toggleDropdown}
                            >
                                <span className="sr-only">Open user menu</span>
                                <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/logo.svg" alt="Flowbite logo"></img>
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600">
                                    <div className="px-4 py-3">
                                        <p className="text-sm text-gray-900 dark:text-white">{auth.user.name}</p>
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">{auth.user.email}</p>
                                    </div>
                                    <ul className="py-1">
                                        <li>
                                            <Link href={route('logout')} method="post" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">Logout</Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
