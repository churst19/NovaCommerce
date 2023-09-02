import { useContext } from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Navbar, Nav, Container } from "react-bootstrap"
import { useCartContext, CartContext } from "../contexts/CartContext"

const Header = () => {
  // const { cart, setCart } = useCartContext()
  const { cartCount } = useContext(CartContext)

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
                    {/* <i className="fas fa-shopping-cart"></i> Cart {count} */}
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
