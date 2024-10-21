import { createContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('')
    const navigate = useNavigate();


    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Select Product size');
            return;
        }

        let cartDate = structuredClone(cartItems);

        if (cartDate[itemId]) {
            if (cartDate[itemId][size]) {
                cartDate[itemId][size] += 1;
            }
            else{
                cartDate[itemId][size] = 1;
            }
        }
        else{
            cartDate[itemId] = {};
            cartDate[itemId][size] = 1;
        }
        setCartItems(cartDate)

        if(token){
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, {headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }

    }

    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try{
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                }catch (error) {
                    console.log(error);
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId,size,quantity) => {
        let cartDate = structuredClone(cartItems);
        cartDate[itemId][size] = quantity;
        setCartItems(cartDate)

        if(token){
            try {
                await axios.post(backendUrl + '/api/cart/update', {itemId,size,quantity}, {headers: {token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product) => product._id === items);
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            
            const response = await axios.get(backendUrl + '/api/product/list');
            
            if(response.data.success){
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers: {token}})
            if(response.data.success){
                setCartItems(response.data.cartDate)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message) 
        }
    }

    useEffect(() => {
        getProductsData();
    },[])

    useEffect(() => {
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    }, [])

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken,
        setCartItems
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;