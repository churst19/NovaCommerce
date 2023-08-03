import React, { useEffect, useRef } from "react"
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
  let total = useRef(0)
  let productsObject = {}

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
        productsObject[cartProductId] = temp.data
      }

      setProducts(result)
    }
    fetchProducts()
    localStorage.setItem("cart", JSON.stringify(cart))

    console.log("products ", products)
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
    if (products) total.current = calculateTotal()
  }, [cart])

  useEffect(() => {
    console.log("product effect")
    //copy product array to object
    // let productsObject = {}
    // for (let object in products) {
    //   productsObject[object._id] = object
    // }
    // console.log("productsObject ",productsObject)
  }, [products])

  const calculatePrice = (price, qty) => {
    let result = price * qty
    console.log("price ", result, " ", result.toFixed(2))
    // result = result.toFixed(2)
    return result
  }

  const handleIncrementItem = (productId) => {
    // localStorage.setItem("jwt", data.token)

    //get qty of this item
    let quantity = cart[productId]
    quantity ? (quantity += 1) : (quantity = 1)

    //update relevant part of cart
    const result = { [productId]: quantity }
    setCart((prevState) => {
      //create new object so state knows something changed in the object
      let newCart = {}
      newCart = Object.assign(newCart, cart)
      newCart = Object.assign(newCart, result)
      return newCart
    })
  }

  const handleDecrementItem = (productId) => {
    // localStorage.setItem("jwt", data.token)

    //get qty of this item
    let quantity = cart[productId]
    if (quantity) quantity -= 1

    //update relevant part of cart
    const result = { [productId]: quantity }
    setCart((prevState) => {
      //create new object so state knows something changed in the object
      let newCart = {}
      newCart = Object.assign(newCart, cart)
      newCart = Object.assign(newCart, result)
      return newCart
    })
  }

  const details = products.map((product) => {
    return (
      <div key={product._id} sm={12} md={6} lg={4} xl={3}>
        {/* TODO: add onhover effect similar to header? */}

        <div className="card mb-3" style={{ maxWidth: "540px" }}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <Link
                style={{ textDecoration: "none" }}
                to={`/product/${product._id}`}
              >
                <img
                  className="card-img"
                  src={product.image}
                  alt={product.name}
                />
              </Link>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h6 className="card-title">{product.name}</h6>
                <p className="card-text">
                  ${calculatePrice(product.price, cart[product._id])}
                </p>
                <p>{product._id}</p>
                <p className="card-text">
                  <small className="text-muted">
                    <btn
                      className="button-background"
                      onClick={() => handleDecrementItem(product._id)}
                    >
                      -
                    </btn>{" "}
                    {cart[product._id]}{" "}
                    <btn
                      className="button-background"
                      onClick={() => handleIncrementItem(product._id)}
                    >
                      +
                    </btn>
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  })
  return (
    <div>
      <h1>Your Cart</h1>
      <Row>{details}</Row>
      {/* TODO: implement total card on right or below here */}
      <Row>TOTAL ${total.current}</Row>
    </div>
  )
}

export default CartScreen
