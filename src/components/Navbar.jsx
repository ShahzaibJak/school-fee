import React from 'react';
import { NavLink } from 'react-router-dom';
import './nav.css'; // import the CSS file

const Nav = () => {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item">
          <NavLink to="/home" className="navbar__link">
            Home
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink to="/add-class" className="navbar__link" >
            Add Class
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink to="/class-list" className="navbar__link" >
            Class List
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink to="/add-student" className="navbar__link" >
            Add Student
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink to="/student-list" className="navbar__link" >
            Student List
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink to="/generate-challan" className="navbar__link">
            Fee Bill
          </NavLink>
        </li>
      
      </ul>
    </nav>
  );
};

export default Nav;
