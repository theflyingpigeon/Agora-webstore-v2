import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'

function BtnRender({product, deleteProduct}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const addCart = state.userAPI.addCart

    const isClothing = product.clothing


    return (
        <div className="row_btn">
            {
                isAdmin ?
                    <div className={"mb-2"}>
                        <Link id="btn_buy" to="#!">
                            onClick={() => deleteProduct(product._id, product.images.public_id)}>
                            Delete
                        </Link>
                        <Link id="btn_view" to={`/edit_product/${product._id}`}>
                            Edit
                        </Link>
                    </div>
                    :

                    isClothing ?
                        <div>
                            <Link id="btn_view" to={`/detail/${product._id}`}>
                                View
                            </Link>
                        </div> :
                        <div>
                            <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>
                                {product.stock > 0 ? "Buy" : "Pre-order"}
                            </Link>
                            <Link id="btn_view" to={`/detail/${product._id}`}>
                                View
                            </Link>
                        </div>

            }

        </div>
    )
}

export default BtnRender