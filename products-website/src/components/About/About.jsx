import React from 'react'

export default function About() {
  return (
    <div className="py-16 sm:py-24">
      <div className="container m-auto px-6 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">

          {/* Image Section */}
          <div className="md:5/12 lg:w-5/12 overflow-hidden rounded-3xl shadow-2xl border border-gray-800">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1170&auto=format&fit=crop"
              alt="Zenith team working together"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 opacity-90 mix-blend-luminosity"
            />
          </div>

          {/* Text Section */}
          <div className="md:7/12 lg:w-6/12">
            <h2 className="text-3xl text-white font-extrabold md:text-5xl tracking-tight mb-6">
              Curating premium products for the modern lifestyle.
            </h2>
            <p className="mt-6 text-gray-400 leading-relaxed text-lg">
              At Zenith, we believe that everyday items should be extraordinary. Our team of passionate curators scours the globe to bring you a carefully selected collection of electronics, apparel, and accessories that elevate your daily routine.
            </p>
            <p className="mt-4 text-gray-400 leading-relaxed text-lg">
              We prioritize quality, exceptional design, and seamless customer experiences so you can shop with absolute confidence.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}