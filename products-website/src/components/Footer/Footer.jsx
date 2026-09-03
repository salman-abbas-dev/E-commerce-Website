import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-gray-950 border-t border-gray-800 mt-auto">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-8 lg:py-12">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        {/* Z icon removed here, leaving only Zenith text */}
                        <Link to="/" className="flex items-center gap-2 text-2xl font-black tracking-tighter text-white">
                            Zenith
                        </Link>
                        <p className="mt-4 text-sm text-gray-400 max-w-xs">
                            Elevate your everyday with premium products delivered straight to your door.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-200 uppercase tracking-wider">Shop</h2>
                            <ul className="text-gray-400 font-medium">
                                <li className="mb-4"><Link to="/products" className="hover:text-indigo-400 transition-colors">All Products</Link></li>
                                <li><Link to="/products" className="hover:text-indigo-400 transition-colors">Categories</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-200 uppercase tracking-wider">Company</h2>
                            <ul className="text-gray-400 font-medium">
                                <li className="mb-4"><Link to="/about" className="hover:text-indigo-400 transition-colors">About Us</Link></li>
                                <li><Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-800 sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center">
                        © {new Date().getFullYear()} <span className="font-semibold text-gray-300">Zenith</span>. All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
}