import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
            </div>
        );
    }

    if (!product) {
        return <div className="text-center py-20 text-2xl font-bold text-gray-300">Product not found.</div>;
    }

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-16 sm:px-6 lg:px-8 min-h-[80vh]">
            <Link to="/products" className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors mb-8 inline-block">
                &larr; Back to Products
            </Link>

            <div className="bg-gray-900 rounded-3xl shadow-2xl border border-gray-800 overflow-hidden flex flex-col md:flex-row p-8 md:p-12 gap-12">
                <div className="md:w-1/2 flex items-center justify-center p-8 bg-white rounded-2xl border border-gray-200">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-[400px] w-auto object-contain hover:scale-105 transition-transform duration-500"
                    />
                </div>

                <div className="md:w-1/2 flex flex-col justify-center">
                    <span className="text-sm font-black text-indigo-400 tracking-widest uppercase mb-4">
                        {product.category}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
                        {product.title}
                    </h1>

                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-4xl font-black text-white">${product.price.toFixed(2)}</span>
                        <div className="flex items-center bg-gray-800 border border-gray-700 px-3 py-1 rounded-full text-sm font-bold text-gray-300">
                            ⭐ {product.rating.rate} ({product.rating.count} reviews)
                        </div>
                    </div>

                    <p className="text-gray-400 text-lg leading-relaxed mb-10">
                        {product.description}
                    </p>

                    <button
                        onClick={() => addToCart(product)}
                        className="w-full md:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1 text-lg"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}