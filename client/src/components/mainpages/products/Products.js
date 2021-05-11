import React, {useContext, useState} from 'react';
import {GlobalState} from "../../../GlobalState";
import ProductItem from "../utils/ProductItem/ProductItem";
import Loading from "../utils/Loading/Loading";
import Filters from "./filters";
import LoadMore from "./LoadMore";
import axios from "axios";

function Products() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsApi.products
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.productsApi.callback
    const [setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)

    const handleCheck = (id) => {
        products.forEach(product => {
            if (product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
    }

    const deleteProduct = async (id, public_id) => {
        try {
            setLoading(true)
            const destroyImg = axios.post('/api/destroy', {public_id}, {
                headers: {Authorization: token}
            })
            const deleteProduct = axios.delete(`/api/products/${id}`, {
                headers: {Authorization: token}
            })

            await destroyImg
            await deleteProduct
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkAll = () => {
        products.forEach(product => {
            product.checked = !isCheck
        })
        setProducts([...products])
        setIsCheck(!isCheck)
    }

    const deleteAll = () => {
        products.forEach(product => {
            if(product.checked) deleteProduct(product._id, product.images.public_id)
        })
    }

    return (
        <div>
            <Filters />
            {
                isAdmin &&
                <div className={"delete-all"}>
                    <span>Select all</span>
                    <input type={"checkbox"} checked={isCheck} onChange={checkAll}/>
                    <button onClick={deleteAll}>Delete all</button>
                </div>
            }
            <div className="products">
                {
                    products.map(product => {
                        return <ProductItem key={product._id} product={product} isAdmin={isAdmin}
                                            deleteProduct={deleteProduct} handleCheck={handleCheck}/>
                    })
                }
            </div>
            <LoadMore />
            {products.length === 0 && <Loading/>}
        </div>
    );
}

export default Products;