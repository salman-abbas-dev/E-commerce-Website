import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../Logo'
import { useCart } from '../../context/CartContext'

export default function Header() {
    const { cartCount, setIsCartOpen } = useCart();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close the mobile menu automatically when a link is clicked
    const closeMenu = () => setIsMobileMenuOpen(false);

    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/products", label: "Shop" },
        { path: "/about", label: "About" },
        { path: "/contact", label: "Contact Us" }
    ];

    return (
        <header className="shadow-lg sticky z-50 top-0 bg-gray-950/80 backdrop-blur-lg border-b border-gray-800">
            <nav className="px-4 lg:px-6 py-4 mx-auto max-w-screen-xl">
                <div className="flex justify-between items-center">

                    {/* Left: Logo */}
                    <div className="flex justify-start lg:w-1/3">
                        <Link to="/" onClick={closeMenu} className="flex items-center transition-transform hover:scale-105">
                            <Logo className="h-10 w-auto" />
                        </Link>
                    </div>

                    {/* Center: Desktop Navigation */}
                    <div className="hidden lg:flex justify-center w-full lg:w-1/3">
                        <ul className="flex font-medium space-x-8">
                            {navLinks.map((item) => (
                                <li key={item.path}>
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `block duration-200 transition-colors ${isActive ? "text-indigo-400 font-bold" : "text-gray-400 font-semibold hover:text-indigo-300"
                                            }`
                                        }
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: Cart & Hamburger */}
                    <div className="flex justify-end items-center gap-2 sm:gap-4 lg:w-1/3">

                        {/* Cart Icon */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 text-gray-300 hover:text-indigo-400 transition-colors"
                        >
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-indigo-600 rounded-full shadow-lg shadow-indigo-500/50">
                                {cartCount}
                            </span>
                        </button>

                        {/* Hamburger Button (Mobile Only) */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-gray-300 hover:text-indigo-400 transition-colors focus:outline-none"
                            aria-label="Toggle mobile menu"
                        >
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    /* X icon when open */
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    /* Hamburger lines when closed */
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Dropdown */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden pt-4 pb-2 border-t border-gray-800 mt-4 animate-in fade-in slide-in-from-top-4 duration-200">
                        <ul className="flex flex-col space-y-2">
                            {navLinks.map((item) => (
                                <li key={item.path}>
                                    <NavLink
                                        to={item.path}
                                        onClick={closeMenu}
                                        className={({ isActive }) =>
                                            `block px-4 py-3 rounded-xl duration-200 transition-colors ${isActive
                                                ? "bg-gray-900 text-indigo-400 font-bold border border-gray-800"
                                                : "text-gray-400 font-semibold hover:bg-gray-900 hover:text-indigo-300"
                                            }`
                                        }
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    );
}