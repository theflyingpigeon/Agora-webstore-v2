import React, {createContext, useState, useEffect} from "react";
import ProductsApi from "./api/ProductsAPI";
import UserApi from "./api/userAPI";
import CatagoriesApi from "./api/CatagoriesAPI";
import axios from "axios";

export const GlobalState = createContext();

export const DataProvider = ({children}) => {
    const [token, setToken] = useState(false);

    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
            const refreshToken = async () =>{
                const res = await axios.get('/user/refresh_token')

                setToken(res.data.accesstoken)

                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
            }
            refreshToken()
        }
    },[])

    const state = {
        token: [token, setToken],
        productsApi: ProductsApi(),
        userAPI: UserApi(token),
        categoriesAPI: CatagoriesApi()
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
