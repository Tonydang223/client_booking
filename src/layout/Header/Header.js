import React from "react";
import { Link } from "react-router-dom";
import './header.css'
import bk from '../../assets/images/book.jpg'
const Header = () => {
  return (
    <header>
      <div className="wrap">
        <img src={bk} alt="booking" />
        <ul className="navi posi">
          <li>Flights</li>
          <li>Hotels</li>
          <li>Homes</li>
          <li>Today's deal</li>
          <li>Apartments</li>
        </ul>
        <ul className="acc posi">
          <li>
            <Link to={"/signIn"}>Sign In</Link>
          </li>
          <li>
            {" "}
            <Link to={"/signUp"}>Create an account</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
