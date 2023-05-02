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
    console.log("effect")
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${props.match.params.id}`)
      setProduct(data)
    }
    fetchProduct()
    // console.log(products)
    // console.log(res)
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
          <p className="product-text">
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
            <btn className="button-background">Add to cart</btn>
          </p>
          {/* <a href="#" className="btn btn-primary">
              View Product
            </a> */}
        </div>
      </div>
    </div>
  )
}

export default Product
