import React, { useEffect, useState } from "react"
// import products from "../products"
import { LinkContainer } from "react-router-bootstrap"
import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import axios from "axios"
// import { BrowserRouter as Router, Route } from "react-router-dom"

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  // console.log(formData)

  function handleChange(event) {
    // console.log(event)
    const { name, value } = event.target
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      }
    })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    console.log(formData)
    axios.post("/api/users/login", formData)
  }
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={submitHandler}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              name="password"
              onChange={handleChange}
              value={formData.password}
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
