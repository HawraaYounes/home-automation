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
          <Route path='/' exact component={Home} />
          <Route path='/history' component={History} />
        </Routes>
        </div>
        </BrowserRouter>
      
     
    </>
  );
}

export default App;