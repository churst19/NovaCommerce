import React, { useEffect } from "react"
// import products from "../products"
import { Link } from "react-router-dom"
import axios from "axios"

const Product = (props) => {
  // const product = products.find((p) => p._id === props.match.params.id)
  // return <div>Product Screen Placeholder</div>
  //TODO: make this more responsive when resizing
  const [product, setProduct] = React.useState([])

  useEffect(() => {
    // console.log("effect")
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${props.match.params.id}`)
      setProduct(data)
    }
    fetchProduct()
  }, [props.match])

  const handleAddToCart = () => {
    // localStorage.setItem("jwt", data.token)
    if (
      //might have to check the {} for empty cart after handling remove from cart functionality
      !localStorage.getItem("cart")
      // JSON.parse(localStorage.getItem("cart") === "{}")
    ) {
      //handle empty cart or cart that doesn't exist
      localStorage.setItem("cart", JSON.stringify({ [product._id]: 1 }))
    } else {
      //get whole cart
      let cart = JSON.parse(localStorage.getItem("cart"))
      //get qty of this item
      let quantity = cart[product._id]
      quantity ? (quantity += 1) : (quantity = 1)

      //update relevant part of cart
      const result = { [product._id]: quantity }
      Object.assign(cart, result)

      localStorage.setItem("cart", JSON.stringify(cart))
    }
  }
  return (
    <div>
      <Link style={{ textDecoration: "none" }} to={`/`}>
        <i className="fa fa-arrow-left" aria-hidden="true"></i>
        <btn className="product-backButton">Back</btn>
      </Link>
      <div className="product">
        <img className="product-img" src={product.image} alt={product.name} />
        <div className="product-body">
          <h3 className="product-title">{product.name}</h3>
          <div className="product-text">
            <h5 className="product-description">{product.description}</h5>
            <h5 className="product-brand">Brand: {product.brand}</h5>
            <h5 className="product-category">Category: {product.category}</h5>
            <h5 className="product-countInStock">
              {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
            </h5>
            <h5 className="product-rating">Rating: {product.rating}/5</h5>
            <h5 className="product-numReviews">
              Reviews ({product.numReviews})
            </h5>
            <h2>
              <strong>${product.price}</strong>
            </h2>
            <btn className="button-background" onClick={handleAddToCart}>
              Add to cart
            </btn>
          </div>
          {/* <a href="#" className="btn btn-primary">
              View Product
            </a> */}
        </div>
      </div>
    </div>
  )
}

export default Product
