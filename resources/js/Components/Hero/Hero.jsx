import { Link, usePage } from "@inertiajs/react";
import React from "react";
const BiryaniImg1 = "/assets/img/biryani3.png";
const BiryaniImg2 = "/assets/img/biryani5.png";
const BiryaniImg3 = "/assets/img/biryani2.png";
const Vector = "/assets/img/pattern_react.png";

const ImageList = [
  {
    id: 1,
    img: BiryaniImg1,
  },
  {
    id: 2,
    img: BiryaniImg2,
  },
  {
    id: 3,
    img: BiryaniImg3,
  },
];

const Hero = () => {
  const [imageId, setImageId] = React.useState(BiryaniImg1);

  const bgImage = {
    backgroundImage: `url(${Vector})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
  };

  const { auth } = usePage().props;

  return (
    <>
      <span id="home"></span>
      <div
        className="min-h-[550px] sm:min-h-[600px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200"
        style={bgImage}
      >
        <div className="container pb-8 sm:pb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* text content section */}
            <div
              data-aos="zoom-out"
              data-aos-duration="400"
              data-aos-once="true"
              className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-orange-400">
                Tasyakuran HUT {" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-blue-600 to-blue-800">
                  Kimia Farma
                </span>{" "}
                ke-53
              </h1>
              <p className="text-sm ">
                Platform aplikasi pemesanan hidangan dalam acara HUT KF Ke 53.Silahkan scroll ke bawah untuk memilih dan melihat menu.
              </p>
              {/* <div>
                <button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:scale-105 duration-200 text-white py-2 px-4 rounded-full">
                    {!auth.user ? (
                        <Link href="/login">Pesan</Link>
                    ) : (
                        auth.user.roles.includes("Admin") ? (
                        <Link href="/dashboard">Pesan</Link>
                        ) : (
                        <Link href="/home">Pesan</Link>
                        )
                    )}
                </button>
              </div> */}
            </div>
            {/* Image section */}
            <div className="min-h-[450px] sm:min-h-[450px] flex justify-center items-center relative order-1 sm:order-2 ">
              <div className="h-[300px] sm:h-[450px] overflow-hidden flex justify-center items-center">
                <img
                  data-aos="zoom-in"
                  data-aos-duration="300"
                  data-aos-once="true"
                  src={imageId}
                  alt="biryani img"
                  className="w-[300px] sm:w-[450px] sm:scale-125  mx-auto spin "
                />
              </div>
              <div className="flex lg:flex-col lg:top-1/2 lg:-translate-y-1/2 lg:py-2 justify-center gap-4 absolute bottom-[0px] lg:-right-10 bg-white/30 rounded-full">
                {ImageList.map((item,index) => (
                  <img
                    data-aos="zoom-in"
                    data-aos-duration="400"
                    data-aos-once="true"
                    src={item.img}
                    key={index}
                    onClick={() => {
                      setImageId(
                        item.id === 1
                          ? BiryaniImg1
                          : item.id === 2
                          ? BiryaniImg2
                          : BiryaniImg3
                      );
                    }}
                    alt="biryani img"
                    className="max-w-[80px] h-[80px] object-contain inline-block hover:scale-105 duration-200"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
