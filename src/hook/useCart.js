import { CartContext } from "../contexts/cart";
import { useContext } from "react";

const useCart = () => {
    const cartContext = useContext(CartContext);
    return cartContext;
}

export default useCart