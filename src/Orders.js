import React, { useEffect, useState } from "react"
import "./Orders.css"
import { db } from "./firebase"
import { useStateValue } from "./StateProvider"
import Order from "./Order"

function Orders() {
  const [orders, setOrders] = useState([])
  const [{ user }] = useStateValue()

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        )
    }
  }, [user])

  return (
    <div className="orders">
      <h1>Your Orders</h1>

      <div className="orders__order">
        {orders?.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </div>
  )
}

export default Orders
