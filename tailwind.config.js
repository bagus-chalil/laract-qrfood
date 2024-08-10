import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        './node_modules/flowbite/**/*.js',
    ],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ["Poppins", "sans-serif"],
            },
            colors: {
                primary: "#ffc001",
                secondary: "#ff9c01",
                dark: "#1e1e1e",
                light: "#f5f5f5",
            },
            container: {
                center: true,
                padding: {
                DEFAULT: "1rem",
                sm: "3rem",
                },
            },
            animation: {
                "spin-slow": "spin 40s linear infinite",
            },
        },
    },

    plugins: [forms,require('flowbite/plugin')],
};
