import { DATA_SUCCESS, RMV_DATA, ADD_TO_CART } from "./actionType";

const initData = {
  data: [],
  cart: [],
};

export const dataReducer = (state = initData, action) => {
  switch (action.type) {
    case DATA_SUCCESS:
      return { ...state, data: [...action.payload] };
      break;
    case ADD_TO_CART:
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      console.log(itemIndex);
      if (itemIndex >= 0) {
        state.cart[itemIndex].quantity += 1;
      } else {
        const temp = { ...action.payload, quantity: 1 };
        // console.log(temp);

        return { ...state, cart: [...state.cart, temp] };
      }
      break;
    case RMV_DATA:
      const itemIndeDec = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cart[itemIndeDec].quantity >= 1) {
        const remove = (state.cart[itemIndeDec].quantity -= 1);
        // console.log([...state.cart, remove]);
        return {
          ...state,
          cart: [...state.cart],
        };
      }
      break;
    default:
      return state;
  }
};
