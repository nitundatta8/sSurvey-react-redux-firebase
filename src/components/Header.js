import React from 'react'
import { Link } from "react-router-dom";

const styleHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '5px',
  backgroundColor: '#06155c',
  fontSize: '30px',
  color: 'ivory',
  width: '100%',
  borderBottom: '5px solid black',
  padding: '1rem'
}

function Header() {
  return (
    <nav style={styleHeader}>
      <Link to="/">Survey</Link>
      <Link to="/signin">Sign In</Link>
    </nav>
  );
}
export default Header;