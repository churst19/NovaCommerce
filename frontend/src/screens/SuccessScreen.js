import React, { useEffect, useContext, useSearchParams } from "react"
import { Link, useLocation } from "react-router-dom"
import axios from "axios"
import { useCartContext, CartContext } from "../contexts/CartContext"
import { BASEURL } from "../Constants"

const Success = () => {
  const { clearCart } = useContext(CartContext)
  //page is data returned from stripe. currently just the customer name.
  const [page, setPage] = React.useState()

  const location = useLocation()
  const myQuery = location.search
  console.log("myQuery: ", myQuery)

  useEffect(() => {
    const fetchSuccess = async () => {
      const { data } = await axios.get(`${BASEURL}/order/success${myQuery}`)
      setPage(data)
      clearCart()
    }
    fetchSuccess()
  }, [])

  return <h5>Thank you for your purchase {page}!</h5>
}

export default Success
