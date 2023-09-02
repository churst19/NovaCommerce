import React, { useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import axios from "axios"

const CartScreen = () => {
  const [products, setProducts] = React.useState([])
  const [cart, setCart] = React.useState({})
  const [total, setTotal] = React.useState(0.0)

  useEffect(() => {
    console.log("initial effect")
    setCart(JSON.parse(localStorage.getItem("cart")))
  }, [])

  //cart effect
  useEffect(() => {
    const fetchProducts = async () => {
      let result = []
      for (let cartProductId in cart) {
        let temp = await axios.get(`/api/products/${cartProductId}`)
        result.push(temp.data)
      }

      setProducts(result)
    }
    if (products.length === 0) fetchProducts()
    localStorage.setItem("cart", JSON.stringify(cart))

    calculateTotal()
  }, [cart])

  //product effect
  useEffect(() => {
    console.log("product effect")
    calculateTotal()
  }, [products])

  const calculatePrice = (price, qty) => {
    let result = price * qty
    result = result.toFixed(2)
    return result
  }

  const calculateTotal = () => {
    let total = 0

    for (let cartProductId in cart) {
      let product = products.find(({ _id }) => _id === cartProductId)
      if (product) total += product.price * cart[cartProductId]
    }
    total = total.toFixed(2)
    setTotal(total)
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
    calculateTotal()
  }

  const handleDecrementItem = (productId) => {
    // localStorage.setItem("jwt", data.token)

    //get qty of this item
    let quantity = cart[productId]
    if (quantity) quantity -= 1
    // console.log("productID", cart.productId)

    //update relevant part of cart
    const result = { [productId]: quantity }
    if (quantity === 0) {
      delete cart[productId]
    }
    setCart((prevState) => {
      //create new object so state knows something changed in the object
      let newCart = {}
      newCart = Object.assign(newCart, cart)
      if (result[productId] !== 0) newCart = Object.assign(newCart, result)
      return newCart
    })
    calculateTotal()
  }

  const details = products.map((product) => {
    let quantity = cart[product._id]
    if (quantity !== 0 && quantity !== undefined) {
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
                        onHover="pointer"
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
    }
  })
  return (
    <div>
      <h1>Your Cart</h1>
      <Row>{details}</Row>
      {/* TODO: implement total card on right or below here */}
      <Row>TOTAL ${total}</Row>
    </div>
  )
}

export default CartScreen
