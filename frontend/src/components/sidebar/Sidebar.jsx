import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Sidebar.css';
import logo from '../sidebar/assets/inhome-logo.PNG' ;
import { IconContext } from 'react-icons';
const Sidebar=()=>{
    const [sidebar, setSidebar] = useState(true);

    const showSidebar = () => setSidebar(!sidebar);
  
    return(
        <>
             <IconContext.Provider value={{ color: '#fff' }}>
    
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items'>
            <li className='navbar-toggle'>
               <img src={logo} className='logo' alt='logo'/>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName} >
                  <Link to={item.path}>
                    <span className='icon'>{item.icon}</span>
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
       </>
    )
}
export default Sidebar;