import LandingLayout from '@/Layouts/LandingLayout';
import React from 'react';

export default function QRShow({ user, transactions }) {
    // Ambil transaksi pertama untuk QR code
    const qrTransaction = transactions.length > 0 ? transactions[0] : null;

    // Cek jika semua transaksi sudah di-scan
    const allScanned = transactions.length > 0 && transactions.every(t => t.is_active == 0);

    return (
        <LandingLayout>
            <div data-aos="fade-up" data-aos-duration="300" className="py-10 bg-gray-100 dark:bg-gray-900">
                {!allScanned ? (
                    <div className="container mx-auto">
                        <div className="text-center max-w-[600px] mx-auto mb-8 mt-4">
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                                QR Code Reservasi Menu
                            </h1>
                        </div>
                        {qrTransaction && qrTransaction.is_active == 1 && (
                            <div className="w-full mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg text-center">
                                <div className="inline-block bg-white p-4 rounded-lg m-2">
                                    <img src={`/qrcode/${user.referal_code}`} alt={`QR Code untuk ${user.referal_code}`} className="mx-auto" />
                                    <p className="font-bold text-gray-900 dark:text-white mt-2">
                                        {user.name} - {user.referal_code}
                                    </p>
                                </div>
                            </div>
                        )}
                        <div className="w-full mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
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
                        </div>
                    </div>
                ) : (
                    <div className="container mx-auto">
                        <div className="text-center max-w-[600px] mx-auto mb-8 mt-4">
                            <p className="text-4xl font-bold text-gray-900 dark:text-white">
                                Semua menu sudah diambil!
                            </p>
                        </div>
                        <div className="text-center max-w-[600px] mx-auto mb-8 mt-4">
                            <p className='m-4'>QR Anda telah digunakan untuk pengambilan makanan. Terima kasih</p>
                            <p className="font-bold text-gray-900 dark:text-white">
                                {user.name}
                            </p>
                        </div>
                    </div>
                )}
                <div className="container mx-auto">
                    <div className="w-full mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Silahkan menuju Booth Makanan dan Tunjukan Kode QR pada PIC Booth Makanan
                        </p>
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
