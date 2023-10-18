import React, { createContext } from "react"
// import { BrowserRouter as Router, Route, withRouter } from "react-router-dom"
import { HashRouter as Router, Route, withRouter } from "react-router-dom"
import { Container } from "react-bootstrap"
import Header from "./components/Navbar"
import Footer from "./components/Footer"
import HomeScreen from "./screens/HomeScreen"
import ProductScreen from "./screens/ProductScreen"
import LoginScreen from "./screens/LoginScreen"
import SignupScreen from "./screens/SignupScreen"
import CartScreen from "./screens/CartScreen"
import SuccessScreen from "./screens/SuccessScreen"

export const UserContext = createContext()

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="py-3">
          <Container>
            <Route exact path="/" component={withRouter(HomeScreen)}></Route>
            <Route
              path="/product/:id"
              component={withRouter(ProductScreen)}
            ></Route>
            <Route path="/login" component={withRouter(LoginScreen)}></Route>
            <Route path="/signup" component={withRouter(SignupScreen)}></Route>
            <Route path="/cart" component={withRouter(CartScreen)}></Route>
            <Route
              path="/success"
              component={withRouter(SuccessScreen)}
            ></Route>
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
