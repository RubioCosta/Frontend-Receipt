
import { createContext, useState, useEffect } from "react";
import { useCookies } from 'react-cookie';


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [cookieToken] = useCookies(['token']);
    const [cookieAdmin] = useCookies(['admin']);

    const [authUser, setAuthUser] = useState(cookieToken.token && cookieToken.token !== "undefined");

    const [admin, setAdmin] = useState(cookieAdmin.admin)
    const [token, setToken] = useState('')

    useEffect(() => {
        setAuthUser(cookieToken.token && cookieToken.token !== "undefined");
        setAdmin(cookieAdmin.admin);
        setToken(cookieToken.token&&cookieToken.token !== "undefined" ? cookieToken.token : '');
    }, [cookieToken.token])

    return (
        <AuthContext.Provider value={{authUser, admin, token}}>
            {children}
        </AuthContext.Provider>
    )

}