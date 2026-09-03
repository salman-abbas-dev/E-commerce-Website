import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  
  // Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('https://zenith-e-commerce-store.vercel.app/api/products');
      const data = await res.json();
      if (res.ok) setProducts(data);
    } catch (err) {
      console.error('Error fetching products', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Format payload to exactly match your backend Mongoose Product model
    const payload = {
      name,
      price: Number(price),
      description,
      category,
      stock: Number(stock),
      imageUrls: [imageUrl] // Backend expects an array of strings
    };

    try {
      const url = editingId 
        ? `https://zenith-e-commerce-store.vercel.app/api/products/${editingId}` 
        : `https://zenith-e-commerce-store.vercel.app/api/products`;
        
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(`Product successfully ${editingId ? 'updated' : 'created'}!`);
        resetForm();
        fetchProducts();
      } else {
        setError(data.message || 'Operation failed');
      }
    } catch (err) {
      setError('An error occurred connecting to the server.');
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setCategory(product.category);
    setStock(product.stock);
    setImageUrl(product.imageUrls[0] || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this product?')) return;
    try {
      const res = await fetch(`https://zenith-e-commerce-store.vercel.app/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (res.ok) {
        fetchProducts();
      }
    } catch (err) {
      console.error('Error deleting product', err);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setPrice('');
    setDescription('');
    setImageUrl('');
    setCategory('');
    setStock('');
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-8 bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl mb-20">
      <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <h2 className="text-3xl font-extrabold text-white">Admin Dashboard</h2>
        <span className="bg-indigo-500/20 text-indigo-400 px-4 py-2 rounded-lg font-bold border border-indigo-500/30">
          Total Products: {products.length}
        </span>
      </div>

      {error && <p className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 font-medium text-center">{error}</p>}
      {success && <p className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl mb-6 font-medium text-center">{success}</p>}

      {/* Product Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 p-6 bg-gray-950 border border-gray-800 rounded-2xl">
        <div className="md:col-span-2 flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
            {editingId && (
                <button type="button" onClick={resetForm} className="text-sm text-gray-400 hover:text-white transition-colors">
                    Cancel Edit ✕
                </button>
            )}
        </div>
        
        <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">Product Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        
        <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">Price ($)</label>
            <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        
        <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">Image URL</label>
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Category</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Stock Count</label>
                <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
        </div>

        <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-400 mb-2">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows="3" className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
        </div>
        
        <button type="submit" className={`md:col-span-2 py-4 text-white font-bold rounded-xl shadow-lg transition-all ${editingId ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20' : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20'}`}>
          {editingId ? 'Update Product Details' : 'Publish Product'}
        </button>
      </form>

      {/* Inventory Table */}
      <h3 className="text-xl font-bold text-white mb-6">Current Inventory</h3>
      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-left border-collapse bg-gray-950">
          <thead>
            <tr className="bg-gray-900 border-b border-gray-800 text-gray-400 text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">Image</th>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Price</th>
              <th className="p-4 font-semibold">Stock</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {products.map((p) => (
              <tr key={p._id} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                <td className="p-4">
                    <img src={p.imageUrls[0]} alt={p.name} className="w-12 h-12 object-cover rounded-lg bg-white p-1" />
                </td>
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4 text-indigo-400 font-bold">${p.price.toFixed(2)}</td>
                <td className="p-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${p.stock > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                        {p.stock > 0 ? p.stock : 'Out'}
                    </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-3">
                      <button onClick={() => handleEdit(p)} className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(p._id)} className="text-sm font-semibold text-red-400 hover:text-red-300 transition-colors">
                        Delete
                      </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;