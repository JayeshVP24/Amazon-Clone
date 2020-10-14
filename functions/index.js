const functions = require("firebase-functions")
const express = require("express")
const cors = require("cors")
const stripe = require("stripe")(
  "sk_test_51HbUGZCXcXyQPCl9M2t22rig6MkOA2nwQvjtZlw0ZXJXm9RYo4R7ucwELPtFm7RVA1P63DQBYlnmBh0tNia5FasC00ZsXvWjwy"
)

//API

//App config
const app = express()

//Middlewares
app.use(cors({ origin: true }))
app.use(express.json())

//API routes
app.get("/", (request, response) => response.status(200).send("Hello World"))

app.post("/payments/create", async (request, response) => {
  const total = request.query.total

  console.log("Payment request recieved BOOM!!!!!! for this amount >>>", total)

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  })

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  })
})

//Listen command
exports.api = functions.https.onRequest(app)

// Example endpoint
// http://localhost:5001/clone-a4a8a/us-central1/api
