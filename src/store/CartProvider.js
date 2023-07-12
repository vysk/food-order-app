import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = { items: [], totalAmount: 0 };

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const exisitingcartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const exisitingcartItem = state.items[exisitingcartItemIndex];

    let updatedItems;

    if (exisitingcartItem) {
      const updatedItem = {
        ...exisitingcartItem,
        amount: exisitingcartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[exisitingcartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === 'REMOVE') {
    const exisitingcartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const exisitingItem = state.items[exisitingcartItemIndex];
    const updatedTotalAmount = state.totalAmount - exisitingItem.price;
    let updatedItems;
    if (exisitingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...exisitingItem,
        amount: exisitingItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[exisitingcartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
