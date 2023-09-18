import React, { createContext, useState, useEffect, useContext } from "react"

export const CartContext = createContext(null)

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {}
  )

  ///////////////////////////////////////////////////////
  ////////////////////// FUNCTIONS //////////////////////
  ///////////////////////////////////////////////////////

  const cartCount = () => {
    //get values of cart object as an array, and adds each element collecting it in accumulator. 0 at end is initial value
    const sum = Object.values(cart).reduce(
      (sumAccumulator, currentValue) => sumAccumulator + currentValue,
      0
    )
    return sum
  }

  const addToCart = (itemId) => {
    // localStorage.setItem("jwt", data.token)

    //get qty of this item
    let quantity = cart[itemId]
    quantity ? (quantity += 1) : (quantity = 1)

    //update relevant part of cart
    const result = { [itemId]: quantity }
    setCart((prevCart) => ({ ...prevCart, [itemId]: quantity }))
  }

  const removeFromCart = (itemId) => {
    // localStorage.setItem("jwt", data.token)

    //get qty of this item
    let quantity = cart[itemId]
    if (quantity) quantity -= 1

    if (quantity <= 0) {
      setCart((prevCart) => {
        const temp = { ...prevCart }
        delete temp[itemId]
        return temp
      })
    } else {
      setCart((prevCart) => ({ ...prevCart, [itemId]: quantity }))
    }
  }

  const clearCart = () => {
    setCart((prevCart) => {
      return {}
    })
  }

  // const loadCart = () => {
  //   const token = localStorage.getItem("jwt")

  //   //fetch user cart from db

  //   //merge current cart and cart from db upon login

  //   //get qty of this item
  //   let quantity = cart[itemId]
  //   if (quantity) quantity -= 1

  //   if (quantity <= 0) {
  //     setCart((prevCart) => {
  //       const temp = { ...prevCart }
  //       delete temp[itemId]
  //       return temp
  //     })
  //   } else {
  //     setCart((prevCart) => ({ ...prevCart, [itemId]: quantity }))
  //   }
  // }

  /////////////////////////////////////////////////////
  ////////////////////// EFFECTS //////////////////////
  /////////////////////////////////////////////////////

  useEffect(() => {
    const cart = localStorage.getItem("cart")
    if (cart) {
      setCart(JSON.parse(cart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        cartCount,
        addToCart,
        removeFromCart,
        cartCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("Cart context should be used within cartContextProvider")
  }
  return context
}
