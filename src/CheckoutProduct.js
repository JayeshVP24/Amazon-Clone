import React from "react"
import "./CheckoutProduct.css"
import { useStateValue } from "./StateProvider"

function CheckoutProduct({
  id,
  image,
  title,
  price,
  rating,
  quantity,
  proceed,
}) {
  const [, dispatch] = useStateValue()
  const removeFromBasket = () => {
    // remove item from basket
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id,
    })
  }

  const handleQuantity = (e) => {
    quantity = e.target.value
    console.log(quantity)
    dispatch({
      type: "UPDATE_QUANTITY",
      id,
      quantity: parseInt(quantity),
    })
  }

  return (
    <div className="checkoutProduct">
      <img src={image} alt={title} className="checkoutProduct__image" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <span key={i} role="img" aria-label="star-rating">
                ⭐
              </span>
            ))}
        </div>
        {proceed && (
          <div className="checkoutProduct__quantityConfirm">
            <p>Qty: {quantity}</p>
          </div>
        )}
        {!proceed && (
          <div className="checkoutProduct__quantityChecks">
            <label htmlFor="quantity">Qty: </label>
            <select id="quantity" value={quantity} onChange={handleQuantity}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
        )}
        {!proceed && (
          <button onClick={removeFromBasket}>Remove from Basket</button>
        )}
      </div>
    </div>
  )
}

export default CheckoutProduct
