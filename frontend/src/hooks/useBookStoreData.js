import { useState } from 'react';

export default function useBookStoreData() {

  const [cartItem, setCartItem] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const getCartQuantity = cartItem.reduce((quantity, item) => item.quantity + quantity, 0)

  const toogleCart = () => setIsCartOpen(!isCartOpen);

  const getItemQuantity = (id) => {
    return cartItem.find(item => item.id === id)?.quantity || 0;
  };

  const increaseCartItem = (id) => {
    setCartItem(currentItem => {
      if (currentItem.find(item => item.id === id) == null) {
        return [currentItem, { id, quantity: 1 }]
      } else {
        return currentItem.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  };

  const decreaseCartItem = (id) => {
    setCartItem(currentItem => {
      if (currentItem.find(item => item.id === id)?.quantity === 1) {
        return currentItem.filter(item => item.id !== id)
      } else {
        return currentItem.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item;
          }
        })
      }
    })
  };

  const removeFromCart = (id) => {
    return cartItem.filter(item => item.id !== id)
  };

  return { getCartQuantity, toogleCart, getItemQuantity, increaseCartItem, decreaseCartItem, removeFromCart };
}