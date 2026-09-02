import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Products from './components/Products/Products.jsx'
import ProductDetails from './components/Products/ProductDetails.jsx'
import Contact from './components/Contact/Contact.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Profile from './components/Profile.jsx'
import AdminDashboard from './components/Admin/AdminDashboard.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "products",
        element: <Products />
      },
      {
        path: "products/:id",
        element: <ProductDetails />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "profile",
            element: <Profile />
          }
        ]
      },
      {
        element: <AdminRoute />,
        children: [
          {
            path: "admin",
            element: <AdminDashboard />
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)