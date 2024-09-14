import React from 'react';
import './ShoppingCart.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart, clearCart, decreaseItemQuantity, increaseItemQuantity, } from './CartSlice';
import './ShoppingCart.css';
import { useState } from 'react';
import { useEffect } from 'react';

const ShoppingCart = () => {
    const dispatch= useDispatch()
    const[superCoins, setSuperCoins] = useState(0);
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalAmount = cartItems.reduce((total, item) => total + item.price *item.quantity, 0);

    useEffect(() => {
        if (totalAmount >= 100 && totalAmount< 200) {
            setSuperCoins(10);
        } else if (totalAmount>= 200 && totalAmount<300) {
            setSuperCoins(20);
        }
            else if (totalAmount>=300) {
                setSuperCoins(30);
            }
        else {setSuperCoins(0);}
    }, [totalAmount]);
    
    const handleRemoveItem = itemId => {
        dispatch(removeItemFromCart(itemId));
    };
    const handleClearCart =() => {
        dispatch(clearCart());
    };
    const handleIncreaseQuantity = itemId => {
        dispatch(increaseItemQuantity(itemId));
    };
    const handleDecreaseQuantity = itemId => {
        dispatch(decreaseItemQuantity(itemId));
    };

  return (
    <>
    <div className="shopping-cart">
      <h2 className="shopping-cart-title">Shopping Cart</h2>
      <ul className="cart-items">
       {cartItems.map (item =>(
        <li key ={item.id} className='cart-item'>
            <span>{item.name} - ${item.price}</span>
            <div  className='quantity-controls'>
                <button className='quantity-control-btn' onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                <span> {item.quantity} </span>
                <button className='quantity-control-btn' onClick={() => handleIncreaseQuantity(item.id)}>+</button>
            </div>
            <button className='remove-itm-button' onClick={() => handleRemoveItem(item.id)}>Remove</button> 

        </li>
       ))}
      </ul>
      <button className="clear-cart-btn" onClick={handleClearCart}>Clear Cart</button>
      <div> {totalAmount? <div>'The total amount is{totalAmount}'</div> : ''} </div>
    {/* Display Super Coins */}
    <div className="super-coins" style={{ textAlign: 'center' }}>
            <h2 className="super-coins-title">Super Coins</h2>
            <p className="super-coins-info">You will earn {superCoins} super coins with this purchase.</p>
          </div>
    
    </div>
    </>
  );
};

export default ShoppingCart;
