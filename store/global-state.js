import { useState } from 'react';

// Actions
const RESTORE_CART_FROM_STORAGE = 'RESTORE_CART_FROM_STORAGE';
const GET_CART = 'GET_CART';
const ADD = 'ADD';
const REMOVE = 'REMOVE';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const UPDATE_TOTAL = 'UPDATE_TOTAL';
const CLEAR = 'CLEAR';

const useGlobalState = () => {
  const [state, setState] = useState({
    cartContents: [],
    total: 0, // total cost in cents
  });

  const actions = (action) => {
    const { type, payload } = action;
    switch (type) {
      case GET_CART:
        return state;

      case ADD:
        const index = state.cartContents.findIndex(
          (el) => el.id === payload.id
        );

        if (index !== -1) {
          return state;
        } else {
          let total = state.total + payload.unit_amount;
          return setState({
            cartContents: [...state.cartContents, payload],
            total,
          });
        }

      case RESTORE_CART_FROM_STORAGE:
        //We can assume state is empty, since the app is being refreshed as a result of the login callback
        return setState({ ...state, cartContents: payload });

      case REMOVE:
        const newList = state.cartContents.filter(
          (item) => item.id !== payload
        );
        return setState({ ...state, cartContents: newList });

      case UPDATE_QUANTITY:
        return setState({ ...state, cartContents: payload });

      case UPDATE_TOTAL:
        let total = state.cartContents.reduce((tot, item) => {
          tot += item.price * item.qty;
          return tot;
        }, 0);
        return setState({ ...state, grandTotal: total });

      case CLEAR:
        return setState({ cartContents: [], grandTotal: 0 });

      default:
        return state;
    }
  };

  return { state, actions };
};

export default useGlobalState;
