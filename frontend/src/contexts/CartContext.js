import React, { createContext, useState, useEffect, useContext } from "react"

// export const UserContext = (createContext < User) | (undefined > undefined)
export const CartContext = createContext(null)

// const AuthContext = React.createContext()

export const CartContextProvider = ({ children }) => {
  //the else statement of this might need changed if format isn't right
  const [cart, setCart] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {}
  )
  // const [cartCount, setCartCount] = useState(0)
  //   const cartCount = 99
  const cartCount = () => {
    //TODO: make this use state to update count after editing the cart,
    //not sure if you would do this here or in a useEffect on ProductScreen.
    //probably the latter and in the cart page
    //most likely need to use global state and useContext or redux
    // if (!localStorage.getItem("cart")) {
    //   //handle cart that doesn't exist
    //   localStorage.setItem("cart", JSON.stringify({}))
    // }
    // const cart = JSON.parse(localStorage.getItem("cart"))

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

    // localStorage.setItem("cart", JSON.stringify(cart))
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
        // setCartCount,
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
