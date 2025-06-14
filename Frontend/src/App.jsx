// App.js
import './App.css'
import Home from './components/Home/Home';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Register from './components/User/Register';
import Cartpage from './pages/cartpage/Cartpage';
import Login from './components/User/Login';
import Trackorderpage from './pages/trackorderpage/Trackorderpage';
import Contactpage from './pages/contact/Contactpage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cartpage" element={<Cartpage />} />
        <Route path="/trackorder" element={<Trackorderpage />} />
        <Route path="/contact" element={<Contactpage />} />
        {/* <Route path="/exclusive" element={<Exclusive />} /> */}
      </Routes>
    </>
  )
}

export default App;
