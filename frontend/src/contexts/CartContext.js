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

  const addToCart = (item) => {
    // localStorage.setItem("jwt", data.token)
    console.log("adding to cart")
    //get qty of this item
    let quantity = cart[item._id]
    quantity ? (quantity += 1) : (quantity = 1)

    //update relevant part of cart
    const result = { [item._id]: quantity }
    // setCart((prevCart) => {
    //   const temp = Object.assign(prevCart, result)
    //   const temp2 = Object.create(temp)
    //   console.log(temp2)
    //   return temp2
    // })
    setCart((prevCart) => ({ ...prevCart, [item._id]: quantity }))

    // localStorage.setItem("cart", JSON.stringify(cart))
  }

  useEffect(() => {
    console.log("cartContext initial effect")
    const cart = localStorage.getItem("cart")
    if (cart) {
      setCart(JSON.parse(cart))
    }
  }, [])

  useEffect(() => {
    console.log("cartContext cart change effect")
    localStorage.setItem("cart", JSON.stringify(cart))

    // setCartCount((prevState) => {
    //   Object.values(cart).reduce(
    //     (sumAccumulator, currentValue) => sumAccumulator + currentValue,
    //     0
    //   )
    // })
  }, [cart])

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        cartCount,
        addToCart,
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
