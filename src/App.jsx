import {React , useState ,useEffect} from 'react';
import { Route, Routes } from 'react-router';
import Login from './pages/Login.jsx';
import { Toaster } from 'react-hot-toast'
import Dashboard from './pages/dashborad.jsx';
import SignUp from './pages/SignUp.jsx';
import Preloader from './components/Preloader.jsx';

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
      {!preloader && ( <div>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: '',
          duration: 2000,
          style: {
            background: '#122f2c',
            color: '#fff',
          },
        }}
      />
      </div>
      )}
    </div>
  )
}

export default App
