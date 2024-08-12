import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Order({ categories, reservationMenu, kode_referal }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        selectedFood: [],
        selectedSnacks: [],
        selectedDrink: null,
    });

    const [selectedFood, setSelectedFood] = useState([]);
    const [selectedSnacks, setSelectedSnacks] = useState([]);
    const [selectedDrink, setSelectedDrink] = useState(null);

    const handleFoodChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedFood(prev => [...prev, value]);
        } else {
            setSelectedFood(prev => prev.filter(item => item !== value));
        }
    };

    const handleSnackChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedSnacks(prev => [...prev, value]);
        } else {
            setSelectedSnacks(prev => prev.filter(item => item !== value));
        }
    };

    const handleDrinkChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedDrink(value);
        } else {
            setSelectedDrink(null);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        setData({
            selectedFood,
            selectedSnacks,
            selectedDrink,
        });

        post(route('submitOrder'), {
            onFinish: () => reset(),
        });
    };

    const foodItems = reservationMenu.filter(item => item.category_id === 1);
    const snackItems = reservationMenu.filter(item => item.category_id === 2);
    const drinkItems = reservationMenu.filter(item => item.category_id === 3);

    return (
        <div data-aos="fade-up" data-aos-duration="300" className="py-10 bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto">
                <div className="text-center max-w-[600px] mx-auto mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Pesan Makanan</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Pilih makanan, snack, dan minuman sesuai preferensi Anda.
                    </p>
                </div>

                <form onSubmit={submit}>
                    <div className="space-y-6">
                        {/* Food Section */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Makanan (Max: 1)</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {foodItems.map(item => (
                                    <div key={item.id} className={`bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-4 ${selectedFood.includes(item.id.toString()) ? 'border-blue-500' : ''}`}>
                                        <img src={item.image_url} alt={item.name} className="w-full h-40 object-cover rounded-md mb-4" />
                                        <div className="flex items-center justify-between">
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    value={item.id}
                                                    onChange={handleFoodChange}
                                                    disabled={selectedFood.length >= 1 && !selectedFood.includes(item.id.toString())}
                                                    checked={selectedFood.includes(item.id.toString())}
                                                    className="form-checkbox"
                                                />
                                                <span className="ml-2 text-gray-700 dark:text-gray-300">{item.name}</span>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Snack Section */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Snack (Max: 3)</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {snackItems.map(item => (
                                    <div key={item.id} className={`bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-4 ${selectedSnacks.includes(item.id.toString()) ? 'border-blue-500' : ''}`}>
                                        <img src={item.image_url} alt={item.name} className="w-full h-40 object-cover rounded-md mb-4" />
                                        <div className="flex items-center justify-between">
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    value={item.id}
                                                    onChange={handleSnackChange}
                                                    disabled={selectedSnacks.length >= 3 && !selectedSnacks.includes(item.id.toString())}
                                                    checked={selectedSnacks.includes(item.id.toString())}
                                                    className="form-checkbox"
                                                />
                                                <span className="ml-2 text-gray-700 dark:text-gray-300">Kuota :{item.limit} / {item.quota}</span>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Drink Section */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Minuman (Max: 1)</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {drinkItems.map(item => (
                                    <div key={item.id} className={`bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-4 ${selectedDrink === item.id.toString() ? 'border-blue-500' : ''}`}>
                                        <img src={item.image_url} alt={item.name} className="w-full h-40 object-cover rounded-md mb-4" />
                                        <div className="flex items-center justify-between">
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    value={item.id}
                                                    onChange={handleDrinkChange}
                                                    checked={selectedDrink === item.id.toString()}
                                                    className="form-checkbox"
                                                />
                                                <span className="ml-2 text-gray-700 dark:text-gray-300">{item.name}</span>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center mt-6">
                            <PrimaryButton type="submit" disabled={processing}>
                                {processing ? 'Submitting...' : 'Submit'}
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
