import React, { useState } from "react";
const Img = "/assets/img/biryani.png";
const Img2 = "/assets/img/biryani2.png";
const Img3 = "/assets/img/biryani4.png";

const ReferalRedeem = () => {
  const [referalCode, setReferalCode] = useState("");

  const link = `https://fest-kf-54.kimiafarma.app/order/${referalCode}`;

  return (
    <>
      <span id="services"></span>
      <div className="py-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 max-w-[400px] mx-auto">
            <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 ">
              Tukarkan Kode
            </p>
            <h1 className="text-3xl font-bold">Referal</h1>
            <p className="text-xs text-gray-400">
              Masukkan kode referal Anda untuk menukarkan pesanan makanan.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <input
              type="text"
              placeholder="Masukkan kode referal"
              value={referalCode}
              onChange={(e) => setReferalCode(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {referalCode && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
              >
                Buka Link Pemesanan
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReferalRedeem;
