import React, { useState } from 'react';
import '../css/Sidebar.css';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout">
      
      <div className="navbar">
        <div className="navbar-left">
          <button className="toggle-button" onClick={toggleSidebar}>
            ☰
          </button>
          <li className='nav-item'>
          <Link className="navbar-title" style={{"color":"white","textDecoration":"none"}} to="/" >RapidXcel Logistics</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/addStock">Add Stock</Link>
          </li>
        </div>
      </div>

      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>

        <ul>
          <li>Dashboard</li>
          <li>Orders</li>
          <li>Logout</li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
