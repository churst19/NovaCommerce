import React, { useEffect, useContext, useSearchParams } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useCartContext, CartContext } from "../contexts/CartContext"

const Success = () => {
  const { clearCart } = useContext(CartContext)
  //page is data returned from stripe. currently just the customer name.
  const [page, setPage] = React.useState()
  const queryString = window.location.search

  const BASEURL = "https://novacommerceserver.onrender.com" || "localhost:5000"

  useEffect(() => {
    const fetchSuccess = async () => {
      const { data } = await axios.get(`${BASEURL}/order/success${queryString}`)
      setPage(data)
      clearCart()
    }
    fetchSuccess()
  }, [])

  return <h5>Thank you for your purchase {page}!</h5>
}

export default Success
