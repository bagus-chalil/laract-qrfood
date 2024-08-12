import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import LandingLayout from '@/Layouts/LandingLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';

export default function Order({ transactions, reservationMenu, kode_referal }) {
    const { props } = usePage();
    const csrfToken = props.csrf_token;

    const { data, setData, post, processing, errors, reset } = useForm({
        selectedFood: [],
        selectedSnacks: [],
        selectedDrink: [],
    });

    const [selectedFood, setSelectedFood] = useState([]);
    const [selectedSnacks, setSelectedSnacks] = useState([]);
    const [selectedDrink, setSelectedDrink] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

    useEffect(() => {
        setIsSubmitEnabled(
            selectedFood.length === 1 &&
            selectedSnacks.length === 2 &&
            selectedDrink.length === 1
        );
    }, [selectedFood, selectedSnacks, selectedDrink]);

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
            setSelectedDrink(prev => [...prev, value]);
        } else {
            setSelectedDrink(prev => prev.filter(item => item !== value));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        router.post('/order/insert', {
            _token: csrfToken,
            selectedFood,
            selectedSnacks,
            selectedDrink,
            referal_code:kode_referal,
        }, {
            onSuccess: () => {
                console.log('Data submitted successfully');
                setIsLoading(false);
            },
            onError: () => {
                console.log('Error occurred while submitting data');
                setIsLoading(false);
            },
        });
    };

    const foodItems = reservationMenu.filter(item => item.category_id === 1);
    const snackItems = reservationMenu.filter(item => item.category_id === 2);
    const drinkItems = reservationMenu.filter(item => item.category_id === 3);

    return (
        <LandingLayout>
            <div data-aos="fade-up" data-aos-duration="300" className="py-10 bg-gray-100 dark:bg-gray-900">
                <div className="container mx-auto">

                    <div className="w-full mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                    {transactions.length === 0 ? (
                        <div id='Form'>
                            <div className="text-center max-w-[600px] mx-auto mb-8">
                                <h4 className="text-4xl font-bold text-gray-900 dark:text-white">Pesan Makanan</h4>
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
                                                    <img src={`/storage/${item.image}`} alt={item.name} className="w-full h-40 object-cover rounded-md mb-4" />
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
                                                            <span className="ml-2 text-gray-700 dark:text-gray-300">{item.name} | <b>Kuota :</b> {item.quota} / {item.limit}</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Snack Section */}
                                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6">
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Snack (Max: 2)</h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {snackItems.map(item => (
                                                <div key={item.id} className={`bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-4 ${selectedSnacks.includes(item.id.toString()) ? 'border-blue-500' : ''}`}>
                                                    <img src={`/storage/${item.image}`} alt={item.name} className="w-full h-40 object-cover rounded-md mb-4" />
                                                    <div className="flex items-center justify-between">
                                                        <label className="flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                value={item.id}
                                                                onChange={handleSnackChange}
                                                                disabled={selectedSnacks.length >= 2 && !selectedSnacks.includes(item.id.toString())}
                                                                checked={selectedSnacks.includes(item.id.toString())}
                                                                className="form-checkbox"
                                                            />
                                                            <span className="ml-2 text-gray-700 dark:text-gray-300">{item.name} | <b>Kuota :</b> {item.quota} / {item.limit}</span>
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
                                                <div key={item.id} className={`bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-4 ${selectedDrink.includes(item.id.toString()) ? 'border-blue-500' : ''}`}>
                                                    <img src={`/storage/${item.image}`} alt={item.name} className="w-full h-40 object-cover rounded-md mb-4" />
                                                    <div className="flex items-center justify-between">
                                                        <label className="flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                value={item.id}
                                                                onChange={handleDrinkChange}
                                                                disabled={selectedDrink.length >= 1 && !selectedDrink.includes(item.id.toString())}
                                                                checked={selectedDrink.includes(item.id.toString())}
                                                                className="form-checkbox"
                                                            />
                                                            <span className="ml-2 text-gray-700 dark:text-gray-300">{item.name} | <b>Kuota :</b> {item.quota} / {item.limit}</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    {isSubmitEnabled && (
                                        <div className="text-center mt-6">
                                            <PrimaryButton type="submit" disabled={processing || isLoading}>
                                                {processing || isLoading ? 'Submitting...' : 'Submit'}
                                            </PrimaryButton>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div id='Table'>
                            <div className="text-center max-w-[600px] mx-auto mb-8 mt-4">
                                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Daftar Pesanan Anda</h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Terima Kasih telah memasan makanan pada acara Tasyakuran HUT Kimi Farma ke-53, berikut Pesanan Anda :
                                </p>
                            </div>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <tbody>
                                        {transactions.map(item => (
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item.id}>
                                                <td className="px-6 py-4">
                                                    {item.reservation_menu.category.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.reservation_menu.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Link href={`/QR/Show/${item.transaction.transaction_code}`}>
                                                        QRCODE
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
