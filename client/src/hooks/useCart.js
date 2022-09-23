import { useContext } from 'react';
import { CartContext } from '../contexts/cartContext';

const useCart = () => useContext(CartContext);

export default useCart;
