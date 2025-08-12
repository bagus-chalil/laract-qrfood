import React, { useState } from "react";
const BiryaniImg = "/assets/img/biryani5.png";
const Vector = "/assets/img/vector3.png";
import { GrSecure } from "react-icons/gr";
import { IoFastFood } from "react-icons/io5";
import { GiFoodTruck } from "react-icons/gi";

const Banner = () => {
  const bgImage = {
    backgroundImage: `url(${Vector})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
  };

  const [activeTab, setActiveTab] = useState('jalur-voucher');

  return (
    <>
      <span id="flow"></span>
      <div className="min-h-[550px] mt-11">
        <div className="min-h-[550px] flex justify-center items-center backdrop-blur-xl py-12 sm:py-0 ">
          <div
            data-aos="slide-up"
            data-aos-duration="300"
            className="container"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Image section */}
              <div>
                <img
                  src={BiryaniImg}
                  alt="biryani img"
                  className="max-w-[430px] w-full mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)]"
                />
              </div>
              {/* text content section */}
              <div className="flex flex-col justify-center gap-6 sm:pt-0">
                <h1 className="text-3xl sm:text-4xl text-center font-bold">
                  Alur Pemesanan.
                </h1>

                <div className="w-full max-w-lg container mx-auto p-4">
                    <div className="tabs">
                        <ul className="flex border-b">
                        <li className="mr-1">
                            <button
                            className={`bg-white inline-block py-2 px-4 ${activeTab === 'jalur-voucher' ? 'text-blue-800 font-semibold' : 'text-blue-500 hover:text-blue-800'}`}
                            onClick={() => setActiveTab('jalur-voucher')}
                            >
                            Jalur Voucher
                            </button>
                        </li>
                        <li className="mr-1">
                            <button
                            className={`bg-white inline-block py-2 px-4 ${activeTab === 'war-tiket' ? 'text-blue-800 font-semibold' : 'text-blue-500 hover:text-blue-800'}`}
                            onClick={() => setActiveTab('war-tiket')}
                            >
                            War Tiket Makanan
                            </button>
                        </li>
                        <li className="mr-1">
                            <button
                            className={`bg-white inline-block py-2 px-4 ${activeTab === 'jalur-registrasi' ? 'text-blue-800 font-semibold' : 'text-blue-500 hover:text-blue-800'}`}
                            onClick={() => setActiveTab('jalur-registrasi')}
                            >
                            Jalur Registrasi
                            </button>
                        </li>
                        </ul>

                        <div className="tab-content mt-4">
                        {activeTab === 'jalur-voucher' && (
                            <div>
                                <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400" style={{ textAlign: 'justify' }}>
                                    <li> Pegawai yang sudah mendapatkan voucher fisik pada hari sebelumnya dapat langsung menuju booth makanan sesuai menu pilihannya.</li>
                                    <li> Pegawai menyerahkan Voucher fisik kepada penjaga booth makanan sebelum mengambil makanan.</li>
                                </ul>

                            </div>
                        )}

                        {activeTab === 'war-tiket' && (
                            <div>
                                <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400" style={{ textAlign: 'justify' }}>
                                    <li>Karyawan di Blast by Email atau WA dengan Kode Referal Unik (misal kode SAP) yg tidak bisa mengisi double.</li>
                                    <li>Karyawan mengakses Web app untuk memilih Makanan di tanggal yang sudah ditentukan.</li>
                                    <li>Data Makanan yg dipilih akan menampilkan stok dan Mengurangi.</li>
                                    <li>Karyawan hanya bisa memilih 1 Makanan Besar, 2 makanan kecil dan 1 Minuman.</li>
                                    <li>Setelah memesan akan langsung ke menu check out dan verifikasi, setelah itu akan Muncul 4 jenis menu pilihan yang jika di klik masing-masing link akan memunculkan QR Code yang nantinya akan di Scan di Booth makanan sesuai dengan gerobaknya.</li>
                                </ul>
                            </div>
                        )}

                        {activeTab === 'jalur-registrasi' && (
                            <div>
                              <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400" style={{ textAlign: 'justify' }}>
                                  <li>Pendaftar (Karyawan Non Veteran dan Tamu Undangan) akan mendatangi Meja Admin untuk diberikan link pendaftaran via Email atau WA.</li>
                                  <li>Admin akan memberikan link untuk registrasi.</li>
                                  <li>Pendaftar akan membuka link dan mengisi registrasi profil.</li>
                                  <li>Pendaftar hanya bisa memilih 1 Makanan Besar, 2 makanan kecil dan 1 Minuman.</li>
                                  <li>Setelah memesan akan langsung ke menu check out dan verifikasi, setelah itu akan Muncul 4 jenis menu pilihan yang jika di klik masing-masing link akan memunculkan QR Code yang nantinya akan di Scan di Booth makanan sesuai dengan gerobaknya.</li>
                                  <li>Pendaftar yang sudah mengisi pada hari H bisa langsung ke Booth makanan yang dipesan dengan menunjukan QR Code Menu Makanan kepada PIC Booth makanan.</li>
                              </ul>
                            </div>
                        )}
                        </div>
                    </div>
                </div>
                <div className="flex gap-6 m-4">
                    <div>
                    <GrSecure className="text-4xl h-20 w-20 shadow-sm p-5 rounded-full bg-violet-100 dark:bg-violet-400" />
                    </div>
                    <div>
                    <IoFastFood className="text-4xl h-20 w-20 shadow-sm p-5 rounded-full bg-orange-100 dark:bg-orange-400" />
                    </div>
                    <div>
                    <GiFoodTruck className="text-4xl h-20 w-20 shadow-sm p-5 rounded-full bg-green-100 dark:bg-green-400" />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
