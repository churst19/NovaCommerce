import React, { createContext, useState, useEffect, useContext } from "react"
import { useHistory } from "react-router-dom"
// import { useCartContext, CartContext } from "../contexts/CartContext"

import axios from "axios"

export const UserContext = createContext(null)

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  )
  const history = useHistory()

  ///////////////////////////////////////////////////////
  ////////////////////// FUNCTIONS //////////////////////
  ///////////////////////////////////////////////////////

  const login = async (formData) => {
    // localStorage.setItem("jwt", data.token)
    const BASEURL =
      "https://novacommerceserver.onrender.com" || "localhost:5000"

    try {
      const res = await axios.post(`${BASEURL}/api/users/login`, formData)
      const data = res.data
      setUser(data.message)
      localStorage.setItem("jwt", data.token)
      //   localStorage.setItem("user", JSON.stringify(data.message))
      // dispatch({ type: "USER", payload: data.user })
      console.log(data)
      return "success"
    } catch (err) {
      console.log("login error: ", err)
      return "failed"
    }
  }

  const signOut = () => {
    console.log("auth context signout")
    setUser((prevUser) => {
      return null
    })
    // localStorage.removeItem("user")
    localStorage.removeItem("jwt")
  }

  /////////////////////////////////////////////////////
  ////////////////////// EFFECTS //////////////////////
  /////////////////////////////////////////////////////

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user))
  }, [user])

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("User context should be used within userContextProvider")
  }
  return context
}
