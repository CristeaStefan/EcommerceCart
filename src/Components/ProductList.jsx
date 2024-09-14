import React, { useState } from 'react';
import './ProductList.css'; 
import { useDispatch } from 'react-redux';
import { addItemToCart } from './CartSlice';
import { useSelector } from 'react-redux';


const ProductList = () => {

const dispatch = useDispatch();
const cartItems = useSelector(state => state.cart.cartItems);

const products = [
    { id: 1, name: 'Product A', price: 60 },
    { id: 2, name: 'Product B', price: 75 },
    { id: 3, name: 'Product C', price: 30 },
  ];
const handleAddToCart = product => {
    dispatch(addItemToCart(product));
    
};
  return (
    <div className="product-list">
      <h2 className="product-list-title">Products</h2>
      <ul className="product-list-items">
       {products.map(product => {
          // Check if the product is already in the cart
          const isInCart = cartItems.find(item => item.id === product.id);
          return(
        <li key ={product.id} className = "product-list-item">
            <span> {product.name} - ${product.price} </span>
            <button 
            className={`add-to-cart-btn ${isInCart ? 'disabled': ''}`}
            onClick ={() => handleAddToCart(product)}
            disabled={!!isInCart}  // Disable if product is in the cart
              >
                {isInCart ? 'In Cart' : 'Add to Cart'}
              </button>
        </li>); 
       })}
      </ul>
    </div>
  );
};

export default ProductList;
