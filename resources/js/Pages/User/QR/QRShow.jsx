import LandingLayout from '@/Layouts/LandingLayout';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function QRShow({ transactionCode }) {
    const qrCodeUrl = `/qrcode/${transactionCode}`;

    return (
        <LandingLayout>
            <div data-aos="fade-up" data-aos-duration="300" className="py-10 bg-gray-100 dark:bg-gray-900">
                <div className="container mx-auto">
                    <div className="text-center max-w-[600px] mx-auto mb-8 mt-4">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">QR Code untuk {transactionCode}</h1>
                    </div>

                    <div className="w-full mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg flex items-center">
                        <img src={qrCodeUrl} alt={`QR Code for ${transactionCode}`} />
                    </div>

                    <div className='text-center'>
                        <Link href={qrCodeUrl} download={`qrcode-${transactionCode}.png`}>
                            Download QR Code
                        </Link>
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
