import React, { useEffect } from "react"
// import products from "../products"
import { LinkContainer } from "react-router-bootstrap"
import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import axios from "axios"
// import { BrowserRouter as Router, Route } from "react-router-dom"

const LoginScreen = () => {
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <LinkContainer to="/signup">
              <Link>Don't have an account? Sign up here.</Link>
            </LinkContainer>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginScreen
