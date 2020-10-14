import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js"
import React, { useEffect, useState } from "react"
import CurrencyFormat from "react-currency-format"
import { Link, useHistory } from "react-router-dom"
import CheckoutProduct from "./CheckoutProduct"
import "./Payment.css"
import { getbasketTotal } from "./reducer"
import { useStateValue } from "./StateProvider"
import axios from "./axios"
import { db } from "./firebase"

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue()
  const history = useHistory()

  const stripe = useStripe()
  const elements = useElements()

  const [succeeded, setSucceeded] = useState(false)
  const [processing, setProcessing] = useState("")
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState(true)

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getbasketTotal(basket) * 100}`,
      })
      setClientSecret(response.data.clientSecret)
    }

    getClientSecret()
  }, [basket])

  const handeSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)

    // eslint-disable-next-line
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          })

        setSucceeded(true)
        setError(null)
        setProcessing(false)

        history.replace("/orders")
      })
      .then(() => {
        dispatch({
          type: "EMPTY_BASKET",
        })
      })
  }

  const handleChange = (e) => {
    setDisabled(e.empty)
    setError(e.error ? e.error.message : "")
  }

  return (
    <div className="payment">
      <div className="payment__container">
        {/* Payment section - delivery address */}
        <h1>
          Checkout (
          <Link to="/checkout">
            {parseInt(
              basket?.reduce(
                (accumulator, currentValue) =>
                  accumulator + currentValue.quantity,
                0
              )
            )}{" "}
            items
          </Link>
          )
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <span>
              {user?.displayName} - {user?.email}
              <p>123 React Street</p>
              <p>Javascript, CS</p>
            </span>
          </div>
        </div>

        {/* Payment section - review items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                quantity={item.quantity}
                proceed={true}
              />
            ))}
          </div>
        </div>
        {/* Payment section - payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe Magic */}
            <form onSubmit={handeSubmit}>
              <div className="payment__testInfo">
                <p>
                  For testing purpose only - keep entering 42 untill all fields
                  are filled
                </p>
                <p>Card Number - 4242 4242 4242 4242</p>
                <p>MM/YY - 04/24</p>
                <p>CVC - 242</p>
                <p>ZIP - 42424</p>
              </div>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getbasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  thousandSpacing={"2s"}
                  prefix={"₹"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"} </span>
                </button>
              </div>
            </form>
          </div>

          {error && <div>{error}</div>}
        </div>
      </div>
    </div>
  )
}

export default Payment
