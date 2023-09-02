import React, { createContext, useState, useEffect, useContext } from "react"

// export const UserContext = (createContext < User) | (undefined > undefined)
export const UserContext = createContext(undefined)

// const AuthContext = React.createContext()

// export function AuthProvider(props){
//     const [authUser,setAuthuser] = useState(null)
//     const [isLoggedIn,setIsLoggedIn] = useState(false)

//     const value = {
//         authUser,setAuthuser,isLoggedIn,setIsLoggedIn
//     }
//     return(
//         <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
//     )
// }
