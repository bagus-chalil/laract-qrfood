import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QRCodeScanner = ({ auth }) => {
    const [scannerReady, setScannerReady] = useState(false);

    useEffect(() => {
        const startScanning = async () => {
            try {
                // Wait for the DOM to be ready
                if (scannerReady) {
                    const html5QrCodeScanner = new Html5QrcodeScanner(
                        "reader",
                        { fps: 10, qrbox: { width: 350, height: 350 } },
                        /* verbose= */ false
                    );

                    const onScanSuccess = (decodedText, decodedResult) => {
                        document.getElementById('transaction').value = decodedText;
                        const transaction = decodedText;
                        html5QrCodeScanner.clear().then(() => {
                            window.location.href = `/qr/verif-transaction/${transaction}`;
                        }).catch(error => {
                            alert('Something went wrong');
                        });
                    };

                    const onScanFailure = (error) => {
                        console.warn(`Code scan error = ${error}`);
                    };

                    html5QrCodeScanner.render(onScanSuccess, onScanFailure);
                }
            } catch (error) {
                console.error('Error initializing QR code scanner:', error);
                alert('Camera streaming not supported by this browser or device.');
            }
        };

        startScanning();

        // Clean up on unmount
        return () => {
            if (scannerReady) {
                html5QrCodeScanner.clear().catch(err => {
                    console.error('Unable to stop scanning', err);
                });
            }
        };
    }, [scannerReady]);

    useEffect(() => {
        // Delay initialization until the component has mounted
        setScannerReady(true);
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">QR Scanner</h2>}
        >
        <Head title="QR Code Scanner" />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
                    <div id="reader" className="w-full h-64 bg-gray-100 border border-gray-300 rounded-lg mb-4"></div>
                    <input
                        type="text"
                        id="transaction"
                        name="transaction"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        disabled
                    />
                    <a
                        href="/qrcode/scan"
                        className="block text-center mt-4 text-blue-600 hover:underline"
                    >
                        Back
                    </a>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default QRCodeScanner;
