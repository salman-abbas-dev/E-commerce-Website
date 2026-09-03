import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://zenith-e-commerce-store.vercel.app/api/products');
        const productsData = await res.json();
        
        // Dynamically grab unique categories from the database
        const uniqueCategories = ['All', ...new Set(productsData.map(p => p.category))];

        setProducts(productsData);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div></div>;

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Our Collection</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="px-4 py-3 bg-gray-900 border border-gray-800 text-white rounded-xl outline-none w-full sm:w-64" />
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-4 py-3 bg-gray-900 border border-gray-800 text-white rounded-xl outline-none w-full sm:w-48 capitalize cursor-pointer">
            {categories.map(category => <option key={category} value={category}>{category}</option>)}
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-lg font-medium">No products match your search.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <Link to={`/products/${product._id}`} key={product._id} className="bg-gray-900 rounded-2xl p-5 border border-gray-800 flex flex-col group shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 transform hover:-translate-y-2 hover:border-gray-700">
              <div className="h-48 w-full bg-white mb-5 rounded-xl overflow-hidden flex items-center justify-center relative p-4">
                <img src={product.imageUrls[0]} alt={product.name} className="h-full object-contain group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex flex-col flex-grow">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">{product.category}</span>
                <h3 className="text-sm font-semibold text-gray-200 line-clamp-2 mb-2 group-hover:text-white transition-colors">{product.name}</h3>
                <div className="mt-auto pt-4"><span className="text-xl font-black text-white">${product.price.toFixed(2)}</span></div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}