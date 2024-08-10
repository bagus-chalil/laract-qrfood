import React from 'react';

export default function Map() {
  return (
    <div data-aos="fade-up" data-aos-duration="300" className="py-10">
      <div className="container">
        <div className="text-center mb-20 max-w-[400px] mx-auto">
          <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
            Lokasi Kami
          </p>
          <h1 className="text-3xl font-bold">PT Kimia Farma</h1>
          <p className="text-xs text-gray-400">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Perspiciatis delectus architecto error nesciunt,
          </p>
        </div>
        <div
          data-aos="zoom-in"
          data-aos-duration="300"
          className="grid grid-cols-1 max-w-[1280px] mx-auto gap-6"
        >
          <div className="w-full h-96">
            <iframe
              title="Kimia Farma Veteran Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d991.8714794295117!2d106.8242363!3d-6.1684396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d0f5bd1341%3A0x400f48f020aa0fcf!2sKimia%20Farma%20Veteran!5e0!3m2!1sen!2sid!4v1693044011001!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
