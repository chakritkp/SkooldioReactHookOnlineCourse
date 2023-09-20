import { createContext , useState , useEffect} from "react";


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const cartItemsString = window.localStorage.getItem('cartItems')
        const cart = cartItemsString ? JSON.parse(cartItemsString) : []
        setCartItems(cart)
        setLoading(false)
    },[]);

    const addCartItem = (product, quantity) => {
        const matchingCartItem = cartItems.find((cartItems) => cartItems.product.id === product.id)
        if (matchingCartItem) {
            matchingCartItem.quantity += quantity
        } else {
            cartItems.push({ product, quantity })
        }
        
        setCartItems(cartItems);
        window.localStorage.setItem('cartItems', JSON.stringify(cartItems))
    };

    const removeCartItem = (productId) => {
        const newCartItems = cartItems.filter((cartItems) => cartItems.product.id !== productId);
        setCartItems(newCartItems);
        window.localStorage.setItem('cartItems', JSON.stringify(newCartItems))
    }

    const updateQuantity = ( productId, quantity) => {
        const matchingCartItem = cartItems.find((cartItems) => cartItems.product.id === productId)
        if (!matchingCartItem) {
            return;
        }
        matchingCartItem.quantity = quantity;
        setCartItems([...cartItems]);
        window.localStorage.setItem('cartItems', JSON.stringify(cartItems))

    };

    const validForCheckout = cartItems.every(
        (cartItem) => cartItem.quantity % 1 === 0 && cartItem.quantity > 0
      );

    const checkout = () => {
        setCartItems([]);
        window.localStorage.setItem('cartItems', JSON.stringify([]));
      };

    return  (
                <CartContext.Provider 
                value={{ cartItems , addCartItem, removeCartItem , updateQuantity , checkout , validForCheckout }}
                >
                    { children }
                </CartContext.Provider>
            )
}
