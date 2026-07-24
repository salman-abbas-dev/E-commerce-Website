import React from 'react'

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We'll be in touch shortly.");
  };

  return (
    <div className="relative flex items-center justify-center min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-gray-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-800">

        {/* Info Side */}
        <div className="md:w-5/12 bg-gray-950 p-10 text-white flex flex-col justify-between relative overflow-hidden border-r border-gray-800">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-indigo-600/20 blur-3xl"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-white">Get in touch</h1>
            <p className="text-gray-400 text-lg font-medium mb-10">
              Have questions about an order or our products? We're here to help.
            </p>

            <div className="space-y-8">
              <div className="flex items-start">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-6 h-6 mt-1 text-indigo-400">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="ml-4">
                  <h3 className="font-bold text-lg text-gray-200">Zenith Headquarters</h3>
                  <p className="text-gray-400">123 Innovation Drive<br />Tech City, TC 10101</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-6 h-6 mt-1 text-indigo-400">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="ml-4">
                  <h3 className="font-bold text-lg text-gray-200">Phone</h3>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-6 h-6 mt-1 text-indigo-400">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div className="ml-4">
                  <h3 className="font-bold text-lg text-gray-200">Email</h3>
                  <p className="text-gray-400">support@zenith.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <form onSubmit={handleSubmit} className="md:w-7/12 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-white mb-8">Send us a message</h2>

          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-400 mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                required
                className="w-full py-3 px-4 rounded-xl bg-gray-950 border border-gray-800 text-white placeholder-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-400 mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                required
                className="w-full py-3 px-4 rounded-xl bg-gray-950 border border-gray-800 text-white placeholder-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-400 mb-2">Message</label>
              <textarea
                id="message"
                rows="4"
                required
                className="w-full py-3 px-4 rounded-xl bg-gray-950 border border-gray-800 text-white placeholder-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                placeholder="How can we help?"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-indigo-500/30 hover:bg-indigo-500 hover:-translate-y-1 transition-all duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}