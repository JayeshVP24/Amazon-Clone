import React from "react"
import "./Subtotal.css"
import CurrencyFormat from "react-currency-format"
import { useStateValue } from "./StateProvider"
import { getbasketTotal } from "./reducer"
import { useHistory } from "react-router-dom"

function Subtotal() {
  const history = useHistory()
  const [{ basket, user }] = useStateValue()

  const handleClick = (e) => {
    if (user) {
      history.push("/payment")
    } else {
      history.push("/login")
    }
  }

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <div>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" id="gift" />
              <label htmlFor="gift">This order contains a gift</label>
            </small>
          </div>
        )}
        decimalScale={2}
        value={getbasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        thousandSpacing={"2s"}
        prefix={"₹"}
      />
      <button disabled={basket.length > 0 ? false : true} onClick={handleClick}>
        Proceed to Checkout
      </button>
      {basket.length < 1 && (
        <small className="subtotal__minItem">Add items to continue</small>
      )}
    </div>
  )
}

export default Subtotal
