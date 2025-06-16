import React, {createContext, useEffect} from "react";
import { useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () =>{
    let cart ={};
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) =>{

    const[all_product,setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    
    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))
    },[])

    const addToCart = (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            updatedCart[itemId] = updatedCart[itemId] + 1;
            return updatedCart;
        });
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({ItemId:itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            const currentQuantity = updatedCart[itemId];
            if (currentQuantity > 0) {
                updatedCart[itemId] = currentQuantity - 1;
            }
            return updatedCart;
        });
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item]> 0){
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}



export default ShopContextProvider 