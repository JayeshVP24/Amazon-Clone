export const initialState = {
  basket: [],
  user: null,
}

export const getbasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price * item.quantity + amount, 0)

const reducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case "UPDATE_QUANTITY":
      const indexxx = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      )
      let newBaskett = [...state.basket]
      newBaskett[indexxx].quantity = action.quantity
      return {
        ...state,
        basket: newBaskett,
      }
    case "ADD_TO_BASKET":
      const indexx = state.basket.findIndex((basketItem) => {
        // console.log(basketItem.id);
        return basketItem.id === action.item.id
      })
      if (indexx > -1) {
        let newBasket = [...state.basket]
        newBasket[indexx].quantity += 1
        return {
          ...state,
          basket: newBasket,
        }
      } else {
        return {
          ...state,
          basket: [...state.basket, action.item],
        }
      }

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      }

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      )
      let newBasket = [...state.basket]

      if (index >= 0) {
        newBasket.splice(index, 1)
      } else {
        console.warn(
          `Can't remove prodcut (id: ${action.id}) as its not in the basket`
        )
      }
      return {
        ...state,
        basket: newBasket,
      }

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      }
    default:
      return state
  }
}

export default reducer
