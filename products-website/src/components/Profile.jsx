import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await fetch(`https://zenith-e-commerce-store.vercel.app/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Profile updated successfully!');
        setPassword(''); // Clear password field after success
      } else {
        setError(data.message || 'Update failed');
      }
    } catch (err) {
      setError('An error occurred while updating profile.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 mb-20 px-4">
      <div className="bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-gray-950 p-8 border-b border-gray-800 flex justify-between items-center">
            <div>
                <h2 className="text-3xl font-extrabold text-white">Account Settings</h2>
                <p className="text-gray-400 mt-2 text-sm">Manage your personal information and security.</p>
            </div>
            <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center border border-indigo-500/30 font-bold text-2xl uppercase">
                {user?.name?.charAt(0) || 'U'}
            </div>
        </div>

        {message && <div className="m-8 mb-0 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl font-medium text-center">{message}</div>}
        {error && <div className="m-8 mb-0 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl font-medium text-center">{error}</div>}

        <form onSubmit={submitHandler} className="p-8 space-y-8">
            
          {/* Personal Information */}
          <div>
              <h3 className="text-xl font-bold text-white mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white placeholder-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white placeholder-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    />
                </div>
              </div>
          </div>

          <hr className="border-gray-800" />

          {/* Security */}
          <div>
              <h3 className="text-xl font-bold text-white mb-4">Security</h3>
              <div className="max-w-md">
                <label className="block text-sm font-semibold text-gray-400 mb-2">Change Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Leave blank to keep current password"
                    className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white placeholder-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="submit"
              className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/30 hover:bg-indigo-500 transition-all duration-300"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="px-8 py-3 bg-gray-800 text-red-400 font-bold rounded-xl border border-gray-700 hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-300"
            >
              Log Out Securely
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Profile; 