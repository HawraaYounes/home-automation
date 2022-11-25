import './App.css';
import React from 'react';
import { BrowserRouter ,Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import History from './pages/History';
import Login from './pages/login';
import Memory from './pages/Memory';
import Image from './pages/Image';
import Message from './pages/Message';
import Register from './pages/register';
function App() {

  return (
    <>
      <BrowserRouter>
        <div className="container">
            
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/history" element={<History />} />
              <Route path="/register" element={<Register />} />
              <Route path="/memories" element={<Memory />} />
              <Route path="/images/:id" element={<Image />} />
              <Route path="/messages" element={<Message />} />
            </Routes>
        </div>
      </BrowserRouter>     
    </>
  );
}

export default App;