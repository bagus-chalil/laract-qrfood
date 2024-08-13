import LandingLayout from '@/Layouts/LandingLayout';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function QRShow({ referal_code, transactions}) {
    const qrCodeUrl = `/qrcode/${referal_code}`;

    return (
        <LandingLayout>
            <div data-aos="fade-up" data-aos-duration="300" className="py-10 bg-gray-100 dark:bg-gray-900">
                { transactions.is_active == 1 ? (
                    <div className="container mx-auto">
                        <div className="text-center max-w-[600px] mx-auto mb-8 mt-4">
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">QR Code untuk {transactions.order.reservation_menu.name}</h1>
                        </div>

                        <div className="w-full mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg flex items-center">
                            <img src={qrCodeUrl} alt={`QR Code for ${referal_code}`} />
                        </div>

                        <div className='text-center'>
                            {/* <Link href={qrCodeUrl} download={`qrcode-${referal_code}.png`}>
                                Download QR Code
                            </Link> */}
                        </div>
                    </div>
                ) : (
                    <div className="container mx-auto">
                        <div className="text-center max-w-[600px] mx-auto mb-8 mt-4">
                            <p className="text-4xl font-bold text-gray-900 dark:text-white">Menu {transactions.order.reservation_menu.name} telah diambil terima kasih</p>
                        </div>
                    </div>
                )}
                <div className="container mx-auto">
                    <div className="w-full mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg flex items-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                            Silahkan menuju Booth Makanan Bakso dan Tunjukan Kode QR pada PIC Booth Makanan
                        </p>
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
