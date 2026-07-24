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
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('https://fakestoreapi.com/products'),
          fetch('https://fakestoreapi.com/products/categories')
        ]);
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        setProducts(productsData);
        setCategories(['All', ...categoriesData]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Our Collection</h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-3 bg-gray-900 border border-gray-800 text-white placeholder-gray-500 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none w-full sm:w-64 shadow-inner transition-all"
          />

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-gray-900 border border-gray-800 text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none w-full sm:w-48 shadow-inner capitalize cursor-pointer transition-all"
          >
            {categories.map(category => (
              <option key={category} value={category} className="bg-gray-900">{category}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-lg font-medium">No products match your search.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
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
                  <div className="flex items-center gap-1 text-sm text-gray-400 font-medium">
                    ⭐ {product.rating.rate}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}