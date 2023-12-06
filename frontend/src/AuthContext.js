import React, { useState, useContext } from 'react'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider(props) {
    const [authUser, setAuthUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userId, setUserId] = useState(null)
    const [userEmail, setEmail] = useState(null)
    const [userPassword, setPassword] = useState(null);

    const logout = () => {
        setAuthUser(null);
        setIsLoggedIn(false);
    }

    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,
        userId,
        setUserId,
        userEmail,
        setEmail,
        userPassword,
        setPassword,
        logout
    }

    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}