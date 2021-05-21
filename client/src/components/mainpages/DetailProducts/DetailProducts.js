import React, {useContext, useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {GlobalState} from "../../../GlobalState";
import ProductItem from "../utils/ProductItem/ProductItem";

function DetailProducts() {
    const params = useParams()
    const state = useContext(GlobalState);
    const [product] = state.productsApi.products
    const addCart = state.userAPI.addCart;
    const [detailProduct, setDetailproduct] = useState([])
    const [sizeStock, setSizeStock] = useState(0)
    const [size, setSize] = useState('')

    useEffect(() => {
        if (params.id) {
            product.forEach(product => {
                if (product._id === params.id) setDetailproduct(product)
            })
        }
    }, [params.id, product])

    const handleSize = e => {
        switch (e.target.value) {
            case 'S' :{
                setSizeStock(detailProduct.S);
                setSize('S');
                break;
            }
            case 'M' :{
                setSizeStock(detailProduct.M);
                setSize('M');
                break;
            }
            case 'L' :{
                setSizeStock(detailProduct.L);
                setSize('L');
                break;
            }
            case 'XL' :{
                setSizeStock(detailProduct.XL);
                setSize('XL');
                break;
            }
        }
    }

    if (detailProduct.length === 0) return null;

    return (

        <div>
            <div className={"detail"}>
                <img src={detailProduct.images.url} alt={""}/>

                <div className={"box-detail"}>
                    <div className={"row"}>
                        <h2>{detailProduct.title}</h2>
                        <h6>#id: {detailProduct.product_id}</h6>
                    </div>
                    <span>€ {detailProduct.price}</span>
                    <p>{detailProduct.description}</p>
                    <p>{detailProduct.content}</p>
                    <p>Sold: {detailProduct.sold}</p>

                    {
                        detailProduct.clothing ?
                            <div className={"filter_menu"}>
                                <select name={"size"} onChange={handleSize} >
                                    <option value={"size options"}>
                                        Please select am option
                                    </option>
                                    <option value={"S"}>S</option>
                                    <option value={"M"}>M</option>
                                    <option value={"L"}>L</option>
                                    <option value={"XL"}>XL</option>
                                </select>
                            </div>
                            : <br/>
                    }

                    <br/>

                    {
                        detailProduct.clothing ?
                        <Link to={'/cart'} className={"cart"}
                              onClick={() => addCart(detailProduct, size)}>{sizeStock > 0 ? "Buy now" : "Pre-order"}</Link>
                        :
                        <Link to={'/cart'} className={"cart"}
                        onClick={() => addCart(detailProduct)}>{detailProduct.stock ? "Buy now" : "Pre-order from clothing"}</Link>
                    }
                </div>
            </div>

            <div>
                <h2>Related Products</h2>
                <div className={"products"}>
                    {
                        product.map(product => {
                            return product.category === detailProduct.category
                                ? <ProductItem key={product._id} product={product}/> : null
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default DetailProducts;