import { createContext, useEffect, useReducer } from "react";
// ----------------------------------------------------------------------

const initialState = {
  cart: []
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { cart } = action.payload;
    return {
      ...state,
      cart
    };
  },
  ADD_TO_CART: (state, action) => {
    const { cart } = action.payload;
    return {
      ...state,
      cart,
    };
  }
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const CartContext = createContext({
  ...initialState,
  addToCart: () => Promise.resolve()
});

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      let temp = JSON.parse(localStorage.getItem('cart'))
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          cart: temp
        },
      });
    };

    initialize();
  }, []);
 
  const addToCart = async (quantity) => {
    let product = JSON.parse(localStorage.getItem("product"));
    let cart = JSON.parse(localStorage.getItem('cart'));

    let flag = cart.filter(item => item.name === product.name);
    if(flag.length === 0) {
      let item = {
        ...product,
        quantity: quantity
      }
      cart.push(item);
    } else {
      flag[0].quantity += quantity
    }

    localStorage.setItem('cart', JSON.stringify(cart))

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        cart: cart
      },
    });

    window.location.href = "/cart";
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        method: "jwt",
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
