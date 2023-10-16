import React, { useEffect, useContext } from "react"
// import products from "../products"
import { Link } from "react-router-dom"
import axios from "axios"
import { CartContext } from "../contexts/CartContext"

const Product = (props) => {
  // const product = products.find((p) => p._id === props.match.params.id)
  // return <div>Product Screen Placeholder</div>
  //TODO: make this more responsive when resizing
  const { addToCart } = useContext(CartContext)
  const [product, setProduct] = React.useState([])

  const BASEURL = "https://novacommerceserver.onrender.com" || "localhost:5000"

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `${BASEURL}/api/products/${props.match.params.id}`
      )
      setProduct(data)
    }
    fetchProduct()
  }, [props.match])

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
            <btn
              className="button-background"
              onClick={() => addToCart(product._id)}
            >
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
