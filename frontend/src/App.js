import React from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import { BrowserRouter ,Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import History from './pages/History';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container">
            <Sidebar/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/history" element={<History />} />
            </Routes>
        </div>
      </BrowserRouter>     
    </>
  );
}

export default App;