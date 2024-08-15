import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import Alert from '@/Components/Alert';

const QRCodeScanner = ({ auth }) => {
    const [scannerReady, setScannerReady] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [scannedCode, setScannedCode] = useState(null); // To store the scanned code
    const html5QrCodeRef = useRef(null); // Use a ref to keep track of the scanner instance

    useEffect(() => {
        const startScanning = async () => {
            if (!html5QrCodeRef.current) {
                html5QrCodeRef.current = new Html5Qrcode("reader");

                const onScanSuccess = async (decodedText, decodedResult) => {
                    if (isProcessing) return; // Prevent multiple scans during processing

                    setIsProcessing(true);
                    setScannedCode(decodedText); // Store the scanned code
                    document.getElementById('transaction').value = decodedText;

                    try {
                        await html5QrCodeRef.current.stop(); // Stop the camera during processing
                        // Redirect to process the scanned transaction
                        window.location.href = `/qr/verif-transaction/${decodedText}`;
                    } catch (error) {
                        console.error('Failed to process the scan:', error);
                        alert('Something went wrong during processing.');
                        setIsProcessing(false);
                        html5QrCodeRef.current.start(
                            { facingMode: "environment" },
                            { fps: 10, qrbox: { width: 350, height: 350 } },
                            onScanSuccess,
                            onScanFailure
                        );
                    }
                };

                const onScanFailure = (error) => {
                    console.warn(`Code scan error = ${error}`);
                };

                try {
                    await html5QrCodeRef.current.start(
                        { facingMode: "environment" },
                        { fps: 10, qrbox: { width: 350, height: 350 } },
                        onScanSuccess,
                        onScanFailure
                    );
                    setScannerReady(true);
                } catch (error) {
                    console.error('Error initializing QR code scanner:', error);
                    alert('Camera streaming not supported by this browser or device.');
                }
            }
        };

        startScanning();

        // Clean up on unmount
        return () => {
            if (html5QrCodeRef.current) {
                html5QrCodeRef.current.stop().then(() => {
                    html5QrCodeRef.current.clear();
                }).catch(err => {
                    console.error('Unable to stop scanning', err);
                });
            }
        };
    }, [isProcessing]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">QR Scanner</h2>}
        >
            <Alert />
            <Head title="QR Code Scanner" />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
                    <div id="reader" className={`w-full h-64 ${isProcessing ? 'bg-gray-300' : 'bg-gray-100'} border border-gray-300 rounded-lg mb-4`}></div>
                    <input
                        type="text"
                        id="transaction"
                        name="transaction"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        disabled
                    />
                    {isProcessing && (
                        <p className="text-center text-blue-600 mt-4">Processing the scanned QR code...</p>
                    )}
                    {scannedCode && !isProcessing && (
                        <p className="text-center text-green-600 mt-4">Successfully scanned code: {scannedCode}</p>
                    )}
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
