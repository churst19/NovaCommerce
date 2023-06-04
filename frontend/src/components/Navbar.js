import React from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Navbar, Nav, Container } from "react-bootstrap"
import Cart from "./Cart"

const Header = () => {
  const cartCount = () => {
    //TODO: make this use state to update count after editing the cart,
    //not sure if you would do this here or in a useEffect on ProductScreen.
    //probably the latter and in the cart page
    if (!localStorage.getItem("cart")) {
      //handle cart that doesn't exist
      localStorage.setItem("cart", JSON.stringify("{}"))
    }
    const cart = JSON.parse(localStorage.getItem("cart"))
    console.log(Object.values(cart))
    const sum = Object.values(cart).reduce((partialSum, a) => partialSum + a, 0)
    return sum
  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Nova</Navbar.Brand>
          </LinkContainer>
          <div className="topnav-right">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <i className="fas fa-shopping-cart"></i> Cart {cartCount()}
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
