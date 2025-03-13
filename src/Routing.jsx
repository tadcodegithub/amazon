import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Landing from "./Pages/Landing/Landing"
import Auth from "./Pages/Auth/Auth"
import Payment from "./Pages/Payment/Payment"
import Orders from "./Pages/Orders/Orders"
import Cart from "./Pages/Cart/Cart"
import Results from "./Pages/Results/Results"
import ProductDetail from "./Pages/ProductDetail/ProductDetail"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"
const stripePromise = loadStripe(
  "pk_test_51QzIRtRp8ZeEmsllk3BvPgm8kDFLz6S4gSRRj0PtQvMJ2FSKXZhnn7hXwgkhfH7LrWwJCPXtmZxdrARPzcmPecqK00BVUD4hZj"
)

function Routing() {
  return (
    <div>
      <Router>
        <Routes basename="/amazon">
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />

          <Route
            path="/orders"
            element={
              <ProtectedRoute
                msg={"you must login to see your order"}
                redirect={"/payments"}
              >
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path="/category/:categoryName" element={<Results />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/payments"
            element={
              <ProtectedRoute
                msg={"you must login to pay"}
                redirect={"/payments"}
              >
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  )
}

export default Routing
