import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css'; // Importer le fichier CSS
import axios from 'axios';
import { Navbar, Nav } from 'react-bootstrap';

function Header() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/users') // Assurez-vous que l'URL est correcte
      .then(response => {
        setUsername(response.data.username);
      })
      .catch(error => {
        console.error('There was an error fetching the user data!', error);
      });
  }, []);

  return (
    <Navbar expand="lg" style={{ backgroundColor: '#CEDFD9' }} className="navbar-desktop">
      <a href="#">
        <Navbar.Brand href="/" className="brand-desktop">Records On Shelf</Navbar.Brand>
      </a>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <a href="#">
            <Nav.Link href="/" className="link-desktop link-collection">Collection</Nav.Link>
          </a>
          <a href="#">
            <Nav.Link href="/category" className="link-desktop link-category">Category</Nav.Link>
          </a>
          <Nav.Link href="/user" className="link-desktop">{username || 'User'}</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
