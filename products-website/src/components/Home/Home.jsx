import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    const [featured, setFeatured] = useState([]);
    const [categories, setCategories] = useState([]);

    // Map the FakeStore API categories to high-quality dark-themed images
    const categoryImages = {
        "electronics": "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=800&auto=format&fit=crop",
        "jewelery": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
        "men's clothing": "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop",
        "women's clothing": "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop"
    };

    // Fallback image just in case the API adds a new category
    const fallbackImage = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop";

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const [featRes, catRes] = await Promise.all([
                    fetch('https://fakestoreapi.com/products?limit=4'),
                    fetch('https://fakestoreapi.com/products/categories')
                ]);
                setFeatured(await featRes.json());
                setCategories(await catRes.json());
            } catch (err) {
                console.error(err);
            }
        };
        fetchHomeData();
    }, []);

    return (
        <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12 space-y-24">

            {/* Hero Section */}
            <div className="relative bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 shadow-2xl shadow-indigo-900/20">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
                        alt="Storefront"
                        className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/80 to-transparent"></div>
                </div>
                <div className="relative z-10 px-6 py-24 sm:py-32 lg:px-16 text-center lg:text-left flex flex-col lg:w-1/2 justify-center h-full">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-6">
                        Discover the new standard of online shopping.
                    </h1>
                    <p className="mt-4 text-xl text-gray-400 max-w-2xl mb-10">
                        Explore Zenith's curated collection of electronics, premium apparel, and statement jewelry.
                    </p>
                    <div>
                        <Link
                            to="/products"
                            className="inline-flex items-center px-8 py-4 text-base font-bold text-white bg-indigo-600 rounded-full hover:bg-indigo-500 transition duration-300 shadow-lg shadow-indigo-500/30 transform hover:-translate-y-1"
                        >
                            Shop the Collection
                        </Link>
                    </div>
                </div>
            </div>

            {/* Shop by Category Section */}
            <div>
                <h2 className="text-3xl font-extrabold text-white mb-10 text-center">Shop by Category</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <Link
                            to="/products"
                            key={category}
                            className="group relative h-48 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden flex items-center justify-center shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 hover:border-indigo-500/50"
                        >
                            {/* Category Background Image */}
                            <img
                                src={categoryImages[category] || fallbackImage}
                                alt={category}
                                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700 mix-blend-luminosity"
                            />

                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-transparent group-hover:from-indigo-900/80 transition-colors duration-300 z-10"></div>

                            {/* Category Title */}
                            <h3 className="z-20 text-2xl font-bold text-white capitalize tracking-wide group-hover:scale-105 transition-transform duration-300 drop-shadow-md">
                                {category}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Featured Products Section */}
            <div>
                <div className="flex justify-between items-end mb-10">
                    <h2 className="text-3xl font-extrabold text-white">Featured Products</h2>
                    <Link to="/products" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">View All &rarr;</Link>
                </div>

                {featured.length === 0 ? (
                    <div className="flex justify-center"><div className="animate-spin rounded-full h-10 w-10 border-t-4 border-indigo-500"></div></div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featured.map(product => (
                            <Link
                                to={`/products/${product.id}`}
                                key={product.id}
                                className="bg-gray-900 rounded-2xl p-5 border border-gray-800 flex flex-col group shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 transform hover:-translate-y-2 hover:border-gray-700"
                            >
                                <div className="h-48 w-full bg-white mb-5 rounded-xl overflow-hidden flex items-center justify-center relative p-4">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex flex-col flex-grow">
                                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">{product.category}</span>
                                    <h3 className="text-sm font-semibold text-gray-200 line-clamp-2 mb-2 group-hover:text-white transition-colors">
                                        {product.title}
                                    </h3>
                                    <div className="mt-auto flex items-center justify-between pt-4">
                                        <span className="text-xl font-black text-white">${product.price.toFixed(2)}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Why Shop at Zenith Section */}
            <div className="pt-12 text-center border-t border-gray-800">
                <h2 className="text-3xl font-extrabold text-white">Why Shop at Zenith?</h2>
                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
                    <div className="p-6 bg-gray-900 rounded-2xl shadow-lg border border-gray-800">
                        <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-indigo-400 text-2xl font-black border border-indigo-500/20">1</div>
                        <h3 className="text-lg font-bold text-gray-200">Premium Quality</h3>
                        <p className="mt-2 text-gray-400">Curated products from top manufacturers globally.</p>
                    </div>
                    <div className="p-6 bg-gray-900 rounded-2xl shadow-lg border border-gray-800">
                        <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-indigo-400 text-2xl font-black border border-indigo-500/20">2</div>
                        <h3 className="text-lg font-bold text-gray-200">Fast Shipping</h3>
                        <p className="mt-2 text-gray-400">Secure and rapid delivery straight to your doorstep.</p>
                    </div>
                    <div className="p-6 bg-gray-900 rounded-2xl shadow-lg border border-gray-800">
                        <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-indigo-400 text-2xl font-black border border-indigo-500/20">3</div>
                        <h3 className="text-lg font-bold text-gray-200">24/7 Support</h3>
                        <p className="mt-2 text-gray-400">Our customer team is always here to help you.</p>
                    </div>
                </div>
            </div>

        </div>
    );
}