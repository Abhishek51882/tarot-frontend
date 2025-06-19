
import './App.css';
import React,{useState} from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const handleLogin = () => setIsLoggedIn(true);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
    
  );
}

export default App;
