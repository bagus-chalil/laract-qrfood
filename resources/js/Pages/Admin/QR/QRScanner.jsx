import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QRCodeScanner = ({ auth }) => {
    useEffect(() => {
        const html5QrCode = new Html5Qrcode("reader");

        const onScanSuccess = (decodedText, decodedResult) => {
            document.getElementById('booking_code').value = decodedText;
            const bookingCode = decodedText;
            html5QrCode.stop().then(() => {
                window.location.href = `/qrcode/scan-view/${bookingCode}`;
            }).catch(error => {
                alert('Something went wrong');
            });
        };

        const onScanFailure = (error) => {
            console.warn(`Code scan error = ${error}`);
        };

        const startScanning = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (stream) {
                    html5QrCode.start(
                        { facingMode: "environment" }, // Configuration
                        { fps: 10, qrbox: { width: 250, height: 250 } }, // UI configuration
                        onScanSuccess,
                        onScanFailure
                    ).catch(error => {
                        console.error('Unable to start scanning', error);
                    });
                }
            } catch (error) {
                console.error('Camera access not supported or failed:', error);
                alert('Camera streaming not supported by this browser or device.');
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
        <AdminLayout auth={auth}>
            <Head title="QR Code Scanner" />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
                    <div id="reader" className="w-full h-64 bg-gray-100 border border-gray-300 rounded-lg mb-4"></div>
                    <input
                        type="text"
                        id="booking_code"
                        name="booking_code"
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
        </AdminLayout>
    );
}

export default QRCodeScanner;
