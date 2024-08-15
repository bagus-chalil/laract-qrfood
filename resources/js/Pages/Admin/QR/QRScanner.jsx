import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import Alert from '@/Components/Alert';

const QRCodeScanner = ({ auth }) => {

    useEffect(() => {
        const html5QrCode = new Html5Qrcode("reader");

        const onScanSuccess = (decodedText, decodedResult) => {
            document.getElementById('transaction').value = decodedText;
            const transaction = decodedText;
            html5QrCode.stop().then(() => {
                window.location.href = `/qr/verif-transaction/${transaction}`;
            }).catch(error => {
                alert('Something went wrong');
            });
        };

        const onScanFailure = (error) => {
            console.warn(`Code scan error = ${error}`);
        };

        const startScanning = async () => {
            try {
                // Requesting camera access
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });

                if (stream) {
                    html5QrCode.start(
                        { facingMode: "environment" },
                        { fps: 10, qrbox: { width: 350, height: 350 } },
                        onScanSuccess,
                        onScanFailure
                    ).catch(error => {
                        console.error('Unable to start scanning:', error);
                        alert('Failed to start the QR code scanner. Please check if your camera is accessible.');
                    });
                }
            } catch (error) {
                // Detailed error handling
                console.error('Camera access error or unsupported feature:', error);
                if (error.name === 'NotAllowedError' || error.name === 'SecurityError') {
                    alert('Camera access denied. Please enable camera permissions in your browser settings.');
                } else if (error.name === 'NotFoundError') {
                    alert('No camera found. Please ensure that your device has a working camera.');
                } else {
                    alert('An unexpected error occurred while accessing the camera.');
                }
            }
        };

        startScanning();

        // Clean up on unmount
        return () => {
            html5QrCode.stop().catch(err => {
                console.error('Unable to stop scanning', err);
            });
        };
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">QR Scanner</h2>}
        >
        <Alert />
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
}

export default QRCodeScanner;
