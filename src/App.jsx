import { React, useState, useEffect } from 'react';
import { Route, Routes, Router } from 'react-router';
import Login from './pages/Login.jsx';
//Pages
import { Toaster } from 'react-hot-toast'
import Dashboard from './pages/dashborad.jsx';
import SignUp from './pages/SignUp.jsx';
import Users from './pages/Users.jsx';
import Products from './pages/Products.jsx';
import Order from './pages/Order.jsx';
import Analytics from './pages/Analytics.jsx';
import Settings from './pages/Settings.jsx';

// Conmpontes
import Preloader from './components/Preloader.jsx';
import Layout from './components/Layout.jsx';

function App() {
  const [preloader, setPreloading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreloading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      {preloader && <Preloader />}
      {!preloader && (<div>


        <Routes >
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<Users />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>

        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            className: '',
            duration: 2000,
            style: {
              background: '#eee',
              color: '#000',
            },
          }}
        />
      </div>
      )}
    </div>
  )
}

export default App
