import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState, useRef } from 'react';
import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';
import Alert from '@/Components/Alert';
import { toast } from 'sonner';
import axios from 'axios';

const QRCodeScanner = ({ auth }) => {
  const scannerRef = useRef(null);
  const isProcessingRef = useRef(false);
  const [cameras, setCameras] = useState([]);
  const [cameraId, setCameraId] = useState(null);
  const [scannerRunning, setScannerRunning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scannedCode, setScannedCode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const initCameras = async () => {
      try {
        const devices = await Html5Qrcode.getCameras();
        if (!devices.length) throw new Error('No cameras found');

        setCameras(devices);
        const backCam = devices.find((d) => /back|rear/i.test(d.label));
        setCameraId(backCam?.id || devices[0].id);
      } catch {
        toast.error('Camera access denied or not available.');
      } finally {
        setIsLoading(false);
      }
    };

    initCameras();
    return () => stopScanner();
  }, []);

  const startScanner = async () => {
    if (!cameraId || scannerRunning) return;

    const scanner = new Html5Qrcode('reader');
    scannerRef.current = scanner;
    isProcessingRef.current = false; // reset supaya bisa scan lagi

    try {
      await scanner.start(
        cameraId,
        { fps: 5, qrbox: { width: 350, height: 350 } },
        async (decodedText) => {
          if (isProcessingRef.current) return;
          isProcessingRef.current = true;

          setIsProcessing(true);
          setScannedCode(decodedText);
          await stopScanner();
          await verifyTransaction(decodedText);

          // setelah selesai, langsung buka scanner lagi
          setTimeout(() => {
            startScanner();
          }, 1000);
        },
        (err) => console.warn('QR scan error:', err)
      );
      setScannerRunning(true);
    } catch {
      toast.error('Failed to start the scanner.');
    }
  };

  const stopScanner = async () => {
    const scanner = scannerRef.current;
    if (!scanner) return;

    try {
      if (scanner.getState && scanner.getState() === Html5QrcodeScannerState.SCANNING) {
        await scanner.stop();
      }
      await scanner.clear();
    } catch {}
    scannerRef.current = null;
    setScannerRunning(false);
  };

    const verifyTransaction = async (code) => {
        try {
            const res = await axios.post(`/qr/verif-transaction/${code}`);
            toast.success(res.data.message);

            // Ambil dari res.data.menus (sesuai backend)
            if (res.data.menus && Array.isArray(res.data.menus)) {
            setMenus(res.data.menus);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Gagal memverifikasi transaksi');

            // Kalau error tapi menus ada di backend, tetap tampilkan
            if (err.response?.data?.menus && Array.isArray(err.response.data.menus)) {
            setMenus(err.response.data.menus);
            }
        } finally {
            setIsProcessing(false);
        }
    };


  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200">QR Scanner</h2>}
    >
      <Alert />
      <Head title="QR Code Scanner" />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
          {isLoading ? (
            <p>Loading cameras...</p>
          ) : (
            <>
              <div
                id="reader"
                className="w-full h-64 bg-gray-100 border border-gray-300 rounded-lg mb-4"
                style={{ minHeight: '300px' }}
              />
              <select
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                value={cameraId || ''}
                onChange={(e) => setCameraId(e.target.value)}
              >
                {cameras.map((cam) => (
                  <option key={cam.id} value={cam.id}>
                    {cam.label || 'Unnamed Camera'}
                  </option>
                ))}
              </select>
              <div className="flex gap-4 mt-4">
                {!scannerRunning ? (
                  <button onClick={startScanner} className="bg-blue-600 text-white px-4 py-2 rounded">
                    Start Scanner
                  </button>
                ) : (
                  <button onClick={stopScanner} className="bg-yellow-500 text-white px-4 py-2 rounded">
                    Stop Scanner
                  </button>
                )}
                <a href="/qrcode/scan" className="bg-red-600 text-white px-4 py-2 rounded">
                  Back
                </a>
              </div>

              {isProcessing && <p className="text-center text-blue-600 mt-4">Processing QR...</p>}
              {scannedCode && !isProcessing && (
                <p className="text-center text-green-600 mt-4">Scanned: {scannedCode}</p>
              )}

              {menus.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-lg mb-2">Menu yang dipesan:</h3>
                  <ul className="list-disc pl-5">
                    {menus.map((menu, idx) => (
                      <li key={idx}>{menu}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default QRCodeScanner;
