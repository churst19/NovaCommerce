import React, { useEffect } from "react"
// import products from "../products"
import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import axios from "axios"
// import { BrowserRouter as Router, Route } from "react-router-dom"

const CartScreen = () => {
  //TODO:
  //pull cart to state
  //load each items details and quantity
  //allow updates to quantity
  //save state's quantities to local storage if navigating away
  const [products, setProducts] = React.useState([])
  const [cart, setCart] = React.useState({})

  useEffect(() => {
    console.log("effect")
    setCart(JSON.parse(localStorage.getItem("cart")))

    // console.log(products)
    // console.log(res)
  }, [])
  useEffect(() => {
    const fetchProducts = async () => {
      await Promise.allSettled()
      const { data } = await axios.get("/api/products")
      setProducts(data)
    }
    fetchProducts()
  }, [cart])
  console.log("cart")
  console.log(cart)
  //now have cart object with product id's as key and qty as value
  //products state is all products in the database
  const cartKeys = Object.keys(cart)

  //   return <h1>Cart Screen</h1>
  const details = cart.map((product) => {
    ;<img className="card-img-top" src={product.image} alt={product.name} />
  })

  //   return (
  //     <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
  //       {/* TODO: add onhover effect similar to header? */}
  //       <Link style={{ textDecoration: "none" }} to={`/product/${product._id}`}>
  //         <div className="card">
  //           <img
  //             className="card-img-top"
  //             src={product.image}
  //             alt={product.name}
  //           />
  //           <div className="card-body">
  //             <h5 className="card-title">{product.name}</h5>
  //             <p className="card-text">
  //               <strong>${product.price}</strong>
  //             </p>
  //             {/* <a href="#" className="btn btn-primary">
  //             View Product
  //           </a> */}
  //           </div>
  //         </div>
  //       </Link>
  //     </Col>
  //   )
  // })

  return <Row>{details}</Row>
}

export default CartScreen
