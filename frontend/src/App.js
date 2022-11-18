import './App.css';
import React from 'react';
import Sidebar from './components/sidebar/Sidebar';
import { BrowserRouter ,Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import History from './pages/History';
import Login from './pages/login';
import Memory from './pages/Memory';
import Image from './pages/Image';

function App() {

  return (
    <>
      <BrowserRouter>
        <div className="container">
            <Sidebar/>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/history" element={<History />} />
              <Route path="/login" element={<Login />} />
              <Route path="/memories" element={<Memory />} />
              <Route path="/images" element={<Image />} />
            </Routes>
        </div>
      </BrowserRouter>     
    </>
  );
}

export default App;