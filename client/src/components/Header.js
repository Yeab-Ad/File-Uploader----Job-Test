import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar variant="dark">
        <Container>
          <Navbar.Brand href="home">
            <Link to={"home"}>Home</Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="home">
              <Link to={"register"}>Register</Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
