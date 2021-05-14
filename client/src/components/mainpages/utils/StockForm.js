import React, {useState, useContext, useEffect} from 'react';
import axios from "axios";

function StockForm() {
    const [product, setProducts] = useState([])
    const [stock, setStock] = useState(0)

    useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get(`/api/products`)
            setProducts(res.data.products)
        }
        getProducts()
    }, [setProducts])

    const updateStock = async (e, id, stock) => {
        e.preventDefault()
        await axios.post('/api/setStock', {
            id: id,
            stock: stock
        })
        window.location.reload(true)
    }

    const updateStockS = async (e, product, stock) => {
        e.preventDefault()

        const newStock = (product.M + product.L + product.XL + Number(stock))

        await axios.post('/api/setStockS', {
            id: product._id,
            stock: newStock,
            S: stock
        })
        window.location.reload(true)
    }
    const updateStockM = async (e, product, stock) => {
        e.preventDefault()
        const newStock = (product.S + product.L + product.XL + Number(stock))
        await axios.post('/api/setStockM', {
            id: product._id,
            stock: newStock,
            M: stock
        })
        window.location.reload(true)
    }
    const updateStockL = async (e, product, stock) => {
        e.preventDefault()
        const newStock = (product.S + product.M + product.XL + Number(stock))
        await axios.post('/api/setStockL', {
            id: product._id,
            stock: newStock,
            L: stock
        })
        window.location.reload(true)
    }
    const updateStockXL = async (e, product, stock) => {
        e.preventDefault()
        const newStock = (product.S + product.M + product.L + Number(stock))
        await axios.post('/api/setStockXL', {
            id: product._id,
            stock: newStock,
            XL: stock
        })
        window.location.reload(true)
    }

    return (
        <div className={"history-page"}>
            <table>
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Inventory</th>
                    <th>new Inventory</th>
                    <th>Save</th>
                </tr>
                </thead>

                <tbody>
                {
                    product.map(product => {
                        if (!product.clothing) return (
                            <tr key={product._id}>
                                <td><img src={product.images.url} alt={"product item"} height={50}/></td>
                                <td>{product.title}</td>
                                <td>{product.stock}</td>

                                <td><input type={"number"} onChange={text => setStock(text.target.value)}/></td>
                                <td>
                                    <button type={"submit"} onClick={e => updateStock(e, product._id, stock)}>Save
                                    </button>
                                </td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>

            <br />

            {
                product.map(product => {
                    if (product.clothing) return (

                        <table>
                            <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>inventory</th>
                                <th>New inventory</th>
                                <th>Save</th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr>
                                <td><img src={product.images.url} alt={"product item"} height={50}/></td>
                                <td>{product.title}</td>
                                <td>{product.stock}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>S</td>
                                <td>{product.S}</td>
                                <td><input type={"number"} onChange={text => setStock(text.target.value)}/></td>
                                <td><button type={"submit"} onClick={e => updateStockS(e, product, stock)}>Save
                                </button></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>M</td>
                                <td>{product.M}</td>
                                <td><input type={"number"} onChange={text => setStock(text.target.value)}/></td>
                                <td><button type={"submit"} onClick={e => updateStockM(e, product, stock)}>Save
                                </button></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>L</td>
                                <td>{product.L}</td>
                                <td><input type={"number"} onChange={text => setStock(text.target.value)}/></td>
                                <td><button type={"submit"} onClick={e => updateStockL(e, product, stock)}>Save
                                </button></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>XL</td>
                                <td>{product.XL}</td>
                                <td><input type={"number"} onChange={text => setStock(text.target.value)}/></td>
                                <td><button type={"submit"} onClick={e => updateStockXL(e, product, stock)}>Save
                                </button></td>
                            </tr>
                            </tbody>

                        </table>
                    )
                })
            }

        </div>
    );
}

export default StockForm;