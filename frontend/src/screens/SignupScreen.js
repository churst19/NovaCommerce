import React, { useEffect, useState } from "react"
// import products from "../products"
import { Row, Col } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { Link, useHistory } from "react-router-dom"
import axios from "axios"
// import { BrowserRouter as Router, Route } from "react-router-dom"

const SignupScreen = () => {
  const history = useHistory()

  const BASEURL = "https://novacommerceserver.onrender.com" || "localhost:5000"

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })

  function handleChange(event) {
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
    axios.post(`${BASEURL}/api/users/signup`, formData)
    history.push("/login")
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={submitHandler}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter username"
              onChange={handleChange}
              name="username"
              value={formData.username}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={handleChange}
              name="email"
              value={formData.email}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={handleChange}
              name="password"
              value={formData.password}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <LinkContainer to="/login">
              <Link>Have an account? Log in here.</Link>
            </LinkContainer>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignupScreen
