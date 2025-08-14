import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function QRShowRegister({ auth }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200">QR Scanner</h2>}
            >
            <Head title="QR Code Scanner" />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
                    <div className="container mx-auto">
                        <div className="text-center max-w-[600px] mx-auto mb-8 mt-4">
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                                QR Code Registrasi
                            </h1>
                        </div>
                            <div className="w-full mt-10 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg text-center">
                                <div className="inline-block bg-white p-4 rounded-lg m-2">
                                    <img src={`/generate/qr-register/`} alt={`QR Code untuk Registrasi`} className="mx-auto" />
                                    <p className="font-bold text-gray-900 dark:text-white mt-2">
                                        Festival Rakyat HUT Kimia Farma 54
                                    </p>
                                </div>
                            </div>
                            {/* <div className="w-full mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Daftar Menu Anda</h2>
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3">Menu</th>
                                            <th className="px-6 py-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactions.map((trx) => (
                                            <tr key={trx.transaction_code} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-6 py-4">{trx.order.reservation_menu.name}</td>
                                                <td className="px-6 py-4">
                                                    {trx.is_active == 1 ? (
                                                        <span className="text-green-600 font-bold">Belum diambil</span>
                                                    ) : (
                                                        <span className="text-red-600 font-bold">Sudah diambil</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div> */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
