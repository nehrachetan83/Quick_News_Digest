import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signin from './components/Signin';
import Login from './components/Login';
import NewsPage from './components/Newpage';
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/news/:category" element={<NewsPage />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
