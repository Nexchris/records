import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';  // Importer le fichier CSS

import { Navbar, Nav } from 'react-bootstrap';

function Header() {
  return (
    
    <Navbar expand="lg" style={{ backgroundColor: '#CEDFD9' }}  className="navbar-desktop">
      <a href="#">
      <Navbar.Brand href="/" className="brand-desktop">Records On Shelf</Navbar.Brand>
      </a>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" className="link-desktop link-collection">Collection</Nav.Link>
          <Nav.Link href="#" className="link-desktop link-category">Category</Nav.Link>
          <Nav.Link href="#" className="link-desktop">User</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
