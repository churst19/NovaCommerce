import React, { useEffect } from "react"
// import products from "../products"
import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import axios from "axios"
// import { BrowserRouter as Router, Route } from "react-router-dom"

const HomeScreen = () => {
  const [products, setProducts] = React.useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products")
      setProducts(data)
    }
    fetchProducts()
  }, [])

  const details = products.map((product) => {
    return (
      <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
        {/* TODO: add onhover effect similar to header? */}
        <Link style={{ textDecoration: "none" }} to={`/product/${product._id}`}>
          <div className="card">
            <img
              className="card-img-top"
              src={product.image}
              alt={product.name}
            />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">
                <strong>${product.price}</strong>
              </p>
              {/* <a href="#" className="btn btn-primary">
              View Product
            </a> */}
            </div>
          </div>
        </Link>
      </Col>
    )
  })

  return <Row>{details}</Row>
}

export default HomeScreen
