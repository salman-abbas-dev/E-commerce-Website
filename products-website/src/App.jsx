import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login';
import Products from './components/Products/Products';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

// Mock components for illustration
import Cart from './components/Cart';
import Profile from './components/Profile';
import AdminDashboard from './components/Admin/AdminDashboard';
import Layout from './Layout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="login" element={<Login />} />
          
          {/* Protected Routes (Logged in users only) */}
          <Route element={<PrivateRoute />}>
            <Route path="cart" element={<Cart />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Admin Only Routes */}
          <Route element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            {/* Add more admin routes here like /admin/products */}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;