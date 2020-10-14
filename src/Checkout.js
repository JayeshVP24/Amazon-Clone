import React from "react"
import "./Checkout.css"
import CheckoutProduct from "./CheckoutProduct"
import { useStateValue } from "./StateProvider"
import Subtotal from "./Subtotal"

function Checkout() {
  const [{ basket, user }] = useStateValue()
  // console.log(typeof basket)
  // const [copy, setCopy] = useState(basket)
  // console.log(copy)
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
          className="checkout__ad"
        />

        <div>
          <h3>Hello, {user?.displayName} </h3>
          <h2 className="checkout__title">Your Shopping Basket</h2>

          {/* CheckoutProduct */}

          {basket.map((item) => (
            <CheckoutProduct
              key={item.id.toString()}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
              quantity={item.quantity}
            />
          ))}
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  )
}

export default Checkout
