import React from "react"
import "./Order.css"
import moment from "moment"
import CheckoutProduct from "./CheckoutProduct"
import CurrencyFormat from "react-currency-format"

function Order({ order }) {
  return (
    <div className="order">
      <h2>ORDER PLACED</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")} </p>
      <p className="order__id">
        <small>Order ID: {order.id} </small>
      </p>
      {order.data.basket?.map((item) => (
        <CheckoutProduct
          key={item.id}
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          quantity={item.quantity}
          proceed
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <h3 className="order__total">Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        thousandSpacing={"2s"}
        prefix={"₹"}
      />
    </div>
  )
}

export default Order
