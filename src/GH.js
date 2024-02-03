import React, { useState } from 'react';
import Cart from './components/Cart';
import ProductList from './components/ProductList';

const GH = () =>{
    const [cartItems, setCartItems] = useState([]);
    const products = [
      { name: 'Product 1', price: 10 },
      { name: 'Product 2', price: 20 },
      // Thêm sản phẩm khác nếu cần
    ];
  
    const addToCart = (product) => {
      setCartItems([...cartItems, product]);
    };
  
    const removeFromCart = (index) => {
      const updatedCart = [...cartItems];
      updatedCart.splice(index, 1);
      setCartItems(updatedCart);
    };
    return(
        <div>
        <ProductList products={products} addToCart={addToCart} />
        <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
        </div>
    )
}

export default GH;