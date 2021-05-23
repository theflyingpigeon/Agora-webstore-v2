import {useState, useEffect} from 'react'
import axios from 'axios'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                    setCart(res.data.cart)

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser()

        }
    }, [token])


    const addCart = async (product, size) => {
        const check = cart.every(item => {
            return item._id !== product._id
        })

        let stock;

        if (product.clothing) product.title = product.title + ' ' + size

        if (check) {
            setCart([...cart, {...product, quantity: 1}])

            if (isLogged) { //added for testing
                await axios.patch('/user/addcart', {cart: [...cart, {...product, quantity: 1}]}, {
                    headers: {Authorization: token}
                })
            }

            if (product.clothing) {
                switch (size) {
                    case 'S' :{
                        stock = product.S
                        break;
                    }
                    case 'M' :{
                        stock = product.M
                        break;
                    }
                    case 'L' :{
                        stock = product.L
                        break;
                    }
                    case 'XL' :{
                        stock = product.XL;
                        break;
                    }
                    default: {
                        break;
                    }
                }
            } else {
                stock = product.stock
            }

                await axios.post('/api/updateStock', {id: product._id, stock: stock, quantity: 1, state: true})

        } else {
            alert("This product has been added to cart.")
        }
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory],
    }
}

export default UserAPI