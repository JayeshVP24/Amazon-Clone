import React, { useEffect } from "react"
import "./App.css"
import Header from "./Header"
import Home from "./Home"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Checkout from "./Checkout"
import Login from "./Login"
import Register from "./Register"
import { auth } from "./firebase"
import { useStateValue } from "./StateProvider"
import Payment from "./Payment"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import Orders from "./Orders"

const promise = loadStripe(
  "pk_test_51HbUGZCXcXyQPCl9yiXFzIqEKuVw8kFedBYuYA298WjgQ8ZxSrZyXgdpe1ND6nnosTgYOOhIHt1HUh06OM3hToSF00w721oLqf"
)

function App() {
  const [, dispatch] = useStateValue()

  useEffect(() => {
    auth.onAuthStateChanged((AuthUser) => {
      if (AuthUser) {
        dispatch({
          type: "SET_USER",
          user: AuthUser,
        })
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        })
      }
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    //BEM
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Header />
            <Home />
          </Route>
          <Route path="/checkout" exact>
            <Header />
            <Checkout />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route exact path="/orders">
            <Header />
            <Orders />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
