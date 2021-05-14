import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/Loading/Loading'
import {useHistory, useParams} from 'react-router-dom'

const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: 'Default description',
    content: 'Default content, cann of corn',
    category: '',
    _id: '',
    stock: 0,
    clothing: false,
    S: 0,
    M: 0,
    L: 0,
    XL: 0
}

function CreateProduct() {
    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)
    const [checked, setChecked] = useState(false)

    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    const history = useHistory()
    const param = useParams()

    const [products] = state.productsApi.products
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.productsApi.callback

    const [total, setTotal] = useState(0)

    useEffect(() => {
        if (param.id) {
            setOnEdit(true)
            products.forEach(product => {
                if (product._id === param.id) {
                    setProduct(product)
                    setImages(product.images)
                }
            })
        } else {
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }

    }, [param.id, products])

    const handleUpload = async e => {
        e.preventDefault()
        try {
            if (!isAdmin) return alert("You're not an admin")
            const file = e.target.files[0]

            if (!file) return alert("You forgot too upload an image.")

            if (file.size > 1024 * 1024 * 512) // 512mb
                return alert("Size too large!")

            if (file.type !== 'image/jpg' && file.type !== 'image/png' && file.type !== 'image/jpeg') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setLoading(false)
            setImages(res.data)


        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            if (!isAdmin) return alert("You're not an admin")
            setLoading(true)
            await axios.post('/api/destroy', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e => {
        const {name, value} = e.target
        setProduct({...product, [name]: value})
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if ((product.S + product.M + product.L + product.XL) > 0){
            const newTotal = (product.S + product.M + product.L + product.XL)
            product.stock = newTotal
            product.clothing = true;
        }

        try {
            if (!isAdmin) return alert("You're not an admin")

            if (onEdit) {
                await axios.put(`/api/products/${product._id}`, {...product, images, clothing: checked}, {
                    headers: {Authorization: token}
                })
            } else {
                await axios.post('/api/products', {...product, images, clothing: checked}, {
                    headers: {Authorization: token}
                })
            }

            setCallback(!callback)
            history.push("/")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }

    return (
        <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                {
                    loading ? <div id="file_img"><Loading/></div>

                        : <div id="file_img" style={styleUpload}>
                            <img src={images ? images.url : ''} alt=""/>
                            <span onClick={handleDestroy}>X</span>
                        </div>
                }

            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="product_id">Product ID</label>
                    <input type="text" name="product_id" id="product_id" required
                           value={product.product_id} onChange={handleChangeInput} disabled={onEdit}/>
                </div>

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required
                           value={product.title} onChange={handleChangeInput}/>
                </div>

                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input type="text" name="price" id="price" required
                           value={product.price} onChange={handleChangeInput}/>
                </div>

                <div className="row">
                    <label htmlFor="stock">Stock</label>
                    <input type="number" name="stock" id="stock" required
                           value={checked ? total : product.stock} onChange={handleChangeInput}/>
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" required
                              value={product.description} rows="5" onChange={handleChangeInput}/>
                </div>

                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea name="content" id="content" required
                              value={product.content} rows="7" onChange={handleChangeInput}/>
                </div>

                <div>
                    <label htmlFor={"Clothing"}>Clothing</label>
                    <input type={"checkbox"} value={checked} onClick={() => setChecked(!checked)}/>
                </div>

                <div className={"row"}>
                    <table className={"history-page"}>
                        <thead>
                        <tr>
                            <th>Size</th>
                            <th>Stock</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>S</td>
                            <td><input type="number" name="S" id="S" value={product.S} onChange={handleChangeInput}/></td>
                        </tr>
                        <tr>
                            <td>M</td>
                            <td><input value={product.M} type={"number"} name={"M"} id={"M"} onChange={handleChangeInput}/></td>
                        </tr>
                        <tr>
                            <td>L</td>
                            <td><input value={product.L} type={"number"} name={"L"} id={"L"} onChange={handleChangeInput}/></td>
                        </tr>
                        <tr>
                            <td>XL</td>
                            <td><input value={product.XL} type={"number"} name={"XL"} id={"XL"} onChange={handleChangeInput}/></td>
                        </tr>
                        </tbody>
                    </table>
                </div>


                <div className="row">
                    <label htmlFor="categories">Categories: </label>
                    <select name="category" value={product.category} onChange={handleChangeInput}>
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>


                <button type="submit">{onEdit ? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default CreateProduct