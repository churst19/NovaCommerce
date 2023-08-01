import React, { useEffect } from "react"
// import products from "../products"
import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import axios from "axios"
// import { BrowserRouter as Router, Route } from "react-router-dom"

const CartScreen = () => {
  //TODO:
  //allow updates to quantity
  //save state's quantities to local storage if navigating away
  const [products, setProducts] = React.useState([])
  const [cart, setCart] = React.useState({})
  let total = 0

  useEffect(() => {
    console.log("initial effect")
    setCart(JSON.parse(localStorage.getItem("cart")))
  }, [])

  useEffect(() => {
    console.log("cart effect")
    const fetchProducts = async () => {
      let result = []
      for (let cartProductId in cart) {
        let temp = await axios.get(`/api/products/${cartProductId}`)
        result.push(temp.data)
      }

      setProducts(result)
    }
    fetchProducts()
    console.log("products ", products)
  }, [cart])

  useEffect(() => {
    console.log("product effect")
    //copy product array to object
    // let productsObject = {}
    // for (let object in products) {
    //   productsObject[object._id] = object
    // }
    // console.log("productsObject ",productsObject)

    const calculateTotal = () => {
      let total = 0

      for (let cartProductId in cart) {
        // calculatePrice( price , qty )
        total += calculatePrice(
          //TODO: I think the problem is that this is not getting the price b/c it is in an array not an object
          // productsObject[cartProductId].price,
          3,
          cart[cartProductId]
        )
        console.log(cartProductId, " ", cart[cartProductId])
        console.log("total ", total)
      }
      return total
    }
    if (products) total = calculateTotal()
  }, [products])

  const calculatePrice = (price, qty) => {
    let result = price * qty
    console.log("price ", result, " ", result.toFixed(2))
    // result = result.toFixed(2)
    return result
  }

  const details = products.map((product) => {
    return (
      <div key={product._id} sm={12} md={6} lg={4} xl={3}>
        {/* TODO: add onhover effect similar to header? */}
        <Link style={{ textDecoration: "none" }} to={`/product/${product._id}`}>
          <div className="card mb-3" style={{ maxWidth: "540px" }}>
            <div className="row no-gutters">
              <div className="col-md-4">
                <img
                  className="card-img"
                  src={product.image}
                  alt={product.name}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h6 className="card-title">{product.name}</h6>
                  <p className="card-text">
                    ${calculatePrice(product.price, cart[product._id])}
                  </p>
                  <p>{product._id}</p>
                  <p className="card-text">
                    <small class="text-muted">
                      REMOVE {cart[product._id]} ADD
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  })
  return (
    <div>
      <h1>Your Cart</h1>
      <Row>{details}</Row>
      {/* TODO: implement total card on right or below here */}
      <Row>TOTAL {total}</Row>
    </div>
  )
}

export default CartScreen
