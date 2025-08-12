import Banner from '@/Components/Banner/Banner';
import PrimaryButton from '@/Components/PrimaryButton';
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
    const [isFormAvailable, setIsFormAvailable] = useState(false);

    useEffect(() => {
        // Determine the time range
        const now = new Date();
        // const yesterdayMorning = new Date();
        // yesterdayMorning.setDate(now.getDate() - 1);
        // yesterdayMorning.setHours(9, 0, 0, 0);

        const todayNoon = new Date();
        todayNoon.setHours(7, 0, 0, 0);

        // Check if current time is within the allowed time range
        if (now >= todayNoon) {
            setIsFormAvailable(true);
        } else {
            setIsFormAvailable(false);
        }

        setIsSubmitEnabled(
            selectedFood.length === 1 &&
            selectedSnacks.length === 1 &&
            selectedDrink.length === 1
        );
    }, [selectedFood, selectedSnacks, selectedDrink]);

    const handleFoodChange = (event, item) => {
        const { value, checked } = event.target;

        if (item.quota >= item.limit) {
            return;
        }

        if (checked) {
            setSelectedFood(prev => [...prev, value]);
        } else {
            setSelectedFood(prev => prev.filter(i => i !== value));
        }
    };

    const handleSnackChange = (event, item) => {
        const { value, checked } = event.target;

        if (item.quota >= item.limit) {
            return;
        }

        if (checked) {
            setSelectedSnacks(prev => [...prev, value]);
        } else {
            setSelectedSnacks(prev => prev.filter(i => i !== value));
        }
    };

    const handleDrinkChange = (event, item) => {
        const { value, checked } = event.target;

        if (item.quota >= item.limit) {
            return;
        }

        if (checked) {
            setSelectedDrink(prev => [...prev, value]);
        } else {
            setSelectedDrink(prev => prev.filter(i => i !== value));
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
            referal_code: kode_referal,
        }, {
            onSuccess: () => {
                router.visit(`/order/${kode_referal}`);
            },
            onError: () => {
                console.log('Error occurred while submitting data');
            },
        });

    };

    const foodItems = reservationMenu.filter(item => item.category_id === 1);
    const snackItems = reservationMenu.filter(item => item.category_id === 2);
    const drinkItems = reservationMenu.filter(item => item.category_id === 3);

    return (
        <LandingLayout>
            <Banner />
            <div data-aos="fade-up" data-aos-duration="300" className="py-10 bg-gray-100 dark:bg-gray-900">
                <div className="container mx-auto">
                    <div className="w-full mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                        {transactions.length === 0 ? (
                            isFormAvailable ? (
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
                                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Makanan (Maksimal: 1)</h2>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {foodItems.map(item => (
                                                        <div key={item.id} className={`bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-4 ${selectedFood.includes(item.id.toString()) ? 'border-blue-500' : ''}`}>
                                                            <div className="flex items-center justify-between mb-4 mt-1">
                                                                <span className="ml-2 text-gray-700 dark:text-gray-300">{item.name}</span>
                                                            </div>
                                                            <img src={`/storage/${item.image}`} alt={item.name} className="w-full h-40 object-cover rounded-md mb-4" />
                                                            <div className="flex items-center justify-between">
                                                                <label className="flex items-center">
                                                                    {item.quota < item.limit && (
                                                                        <input
                                                                            type="checkbox"
                                                                            value={item.id}
                                                                            onChange={(e) => handleFoodChange(e, item)}
                                                                            disabled={selectedFood.length >= 1 && !selectedFood.includes(item.id.toString()) || item.quota >= item.limit}
                                                                            checked={selectedFood.includes(item.id.toString())}
                                                                            className="form-checkbox"
                                                                        />
                                                                    )}
                                                                    <h6 className="ml-2 text-gray-700 dark:text-gray-300" id='status'>
                                                                        <b>{item.quota >= item.limit ? 'Habis' : 'Tersedia'}</b>
                                                                    </h6>
                                                                    <span className="ml-2 text-gray-700 dark:text-gray-300"> | <b>Kuota :</b> {item.quota} / {item.limit}</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Snack Section */}
                                            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6">
                                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Jajanan (Maksimal: 1)</h2>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {snackItems.map(item => (
                                                        <div key={item.id} className={`bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-4 ${selectedSnacks.includes(item.id.toString()) ? 'border-blue-500' : ''}`}>
                                                            <div className="flex items-center justify-between mb-4 mt-1">
                                                                <span className="ml-2 text-gray-700 dark:text-gray-300">{item.name}</span>
                                                            </div>
                                                            <img src={`/storage/${item.image}`} alt={item.name} className="w-full h-40 object-cover rounded-md mb-4" />
                                                            <div className="flex items-center justify-between">
                                                                <label className="flex items-center">
                                                                    {item.quota < item.limit && (
                                                                        <input
                                                                            type="checkbox"
                                                                            value={item.id}
                                                                            onChange={(e) => handleSnackChange(e, item)}
                                                                            disabled={selectedSnacks.length >= 1 && !selectedSnacks.includes(item.id.toString()) || item.quota >= item.limit}
                                                                            checked={selectedSnacks.includes(item.id.toString())}
                                                                            className="form-checkbox"
                                                                        />
                                                                    )}
                                                                    <h6 className="ml-2 text-gray-700 dark:text-gray-300" id='status'>
                                                                        <b>{item.quota >= item.limit ? 'Habis' : 'Tersedia'}</b>
                                                                    </h6>
                                                                    <span className="ml-2 text-gray-700 dark:text-gray-300"> | <b>Kuota :</b> {item.quota} / {item.limit}</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Drink Section */}
                                            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6">
                                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Minuman (Maksimal: 1)</h2>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {drinkItems.map(item => (
                                                        <div key={item.id} className={`bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-4 ${selectedDrink.includes(item.id.toString()) ? 'border-blue-500' : ''}`}>
                                                            <div className="flex items-center justify-between mb-4 mt-1">
                                                                <span className="ml-2 text-gray-700 dark:text-gray-300">{item.name}</span>
                                                            </div>
                                                            <img src={`/storage/${item.image}`} alt={item.name} className="w-full h-40 object-cover rounded-md mb-4" />
                                                            <div className="flex items-center justify-between">
                                                                <label className="flex items-center">
                                                                    {item.quota < item.limit && (
                                                                        <input
                                                                            type="checkbox"
                                                                            value={item.id}
                                                                            onChange={(e) => handleDrinkChange(e, item)}
                                                                            disabled={selectedDrink.length >= 1 && !selectedDrink.includes(item.id.toString()) || item.quota >= item.limit}
                                                                            checked={selectedDrink.includes(item.id.toString())}
                                                                            className="form-checkbox"
                                                                        />
                                                                    )}
                                                                    <h6 className="ml-2 text-gray-700 dark:text-gray-300" id='status'>
                                                                        <b>{item.quota >= item.limit ? 'Habis' : 'Tersedia'}</b>
                                                                    </h6>
                                                                    <span className="ml-2 text-gray-700 dark:text-gray-300"> | <b>Kuota :</b> {item.quota} / {item.limit}</span>
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
                                                        {processing || isLoading ? 'Sedang Memesan...' : 'Pesan'}
                                                    </PrimaryButton>
                                                </div>
                                            )}
                                        </div>
                                    </form>
                                </div>
                                ) : (
                                    <div className="text-center max-w-[600px] mx-auto mb-8 mt-4">
                                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Form Tidak Tersedia</h1>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Formulir ini hanya dapat diakses dari jam 09:00 pagi kemarin hingga jam 15:00 siang hari ini.
                                        </p>
                                    </div>
                                )
                            ) : (
                                <div id='Table'>
                                    <div className="text-center max-w-[600px] mx-auto mb-8 mt-4">
                                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Daftar Pesanan Anda</h1>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Terima Kasih telah memesan makanan pada acara Tasyakuran HUT Kimia Farma ke-54, berikut Pesanan Anda :
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
                                                        {/* <td className="px-6 py-4">
                                                            <Link href={`/QR/Show/${item.transaction.transaction_code}/${item.transaction.id}`}>
                                                                QRCODE
                                                            </Link>
                                                        </td> */}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className="flex justify-center my-6">
                                            <button
                                                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-950 group-hover:from-blue-400 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-blue-800"
                                            >
                                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                    <a href={`/QR/Show/${kode_referal}`}>
                                                        Link QRCODE
                                                    </a>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
