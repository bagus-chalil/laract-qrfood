import GuestLayout from '@/Layouts/GuestLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function ViewGuestRegister() {
    const { referalCode } = usePage().props;
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referalCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <GuestLayout>
            <Head title="View Guest Register" />

            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 font-roboto">
                <h4 className="text-center text-xl font-semibold mb-4">
                    Referal kode untuk Pemesanan Makanan pada acara HUT KF -54
                </h4>

                <p className="text-gray-600 mb-4">
                    Halo Insan Kimia Farma! 🎉
                </p>
                <p className="text-gray-600 mb-4">
                    Dalam rangka memeriahkan acara <b>Festival Rakyat di acara HUT KF ke-54</b>,
                    kami mengundang kalian untuk menikmati berbagai hidangan lezat yang telah kami siapkan.
                    Jangan lewatkan kesempatan ini untuk mencicipi hidangan spesial yang hanya tersedia untuk Anda!
                </p>

                {/* Kode Referal */}
                <div className="mt-6 text-center">
                    <p className="text-gray-800 font-medium mb-2">Kode referal Anda adalah:</p>
                    <div className="inline-flex items-center bg-gray-100 px-4 py-2 rounded-lg shadow-sm border border-gray-300">
                        <span className="font-mono text-lg mr-3">{referalCode}</span>
                        <button
                            onClick={copyToClipboard}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                        >
                            {copied ? "✅ Copied" : "Copy"}
                        </button>
                    </div>
                </div>

                {/* Link Pemesanan */}
                <div className="mt-6">
                    <p className="text-gray-800 font-medium">📱 Cara Pesan:</p>
                    <p className="text-gray-600">
                        Pesan Menu Makanan di Sini:
                        <a
                            href={`https://fest-kf-54.kimiafarma.app/order/${referalCode}`}
                            className="text-blue-600 underline ml-1"
                        >
                            {`https://fest-kf-54.kimiafarma.app/order/${referalCode}`}
                        </a>
                    </p>
                </div>

                <div className="text-right mt-6 text-gray-600">
                    Terima kasih, Semoga sehat selalu.
                </div>

                <div className="text-center mt-6 text-sm text-gray-400">
                    © {new Date().getFullYear()} PT Kimia Farma Tbk. Development by IT KFHO
                </div>
            </div>
        </GuestLayout>
    );
}
