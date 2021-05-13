import React, {useState, useContext, useEffect} from 'react';
// import {GlobalState} from "../../../GlobalState";
import "bootstrap/dist/js/bootstrap.min"
import axios from "axios";

function StockForm() {
    // const state = useContext(GlobalState)
    const [product, setProducts] = useState([])
    const [stock, setStock] = useState(0)

    useEffect(() =>{
        const getProducts = async () => {
            const res = await axios.get(`/api/products`)
            setProducts(res.data.products)
        }
        getProducts()
    },[setProducts])

    const updateStock = async (e, id, stock) => {
        e.preventDefault()
        await axios.post('/api/setStock', {
            id: id,
            stock: stock
        })
        window.location.reload(true)
    }

    return (
        <div className={"history-page"}>
            <table>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Inventory</th>
                    <th>new Inventory</th>
                    <th>Save</th>
                </tr>

                {
                    product.map(product => (
                        <tr key={product._id}>
                            <td><img src={product.images.url} alt={"product item"} height={50}/></td>
                            <td>{product.title}</td>
                            <td>{product.stock}</td>

                            <td><input type={"number"} onChange={text => setStock(text.target.value)}/></td>
                            <td>
                                <button type={"submit"} onClick={e => updateStock(e, product._id, stock)}>Save</button>
                            </td>
                        </tr>
                    ))
                }
            </table>
        </div>
    );
}

export default StockForm;