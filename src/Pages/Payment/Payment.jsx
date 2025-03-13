import React, { useContext, useState } from "react"
import LayOut from "../../Components/LayOut/LayOut"
import style from "./payment.module.css"
import { DataContext } from "../../Components/DataProvider/DataProvide"
import ProductCard from "../../Components/Product/ProductCard"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat"
import { axiosInstance } from "../../Api/axios"
import { ClipLoader } from "react-spinners"
import { db } from "../../Utility/firebase"
import { useNavigate } from "react-router-dom"
import { Type } from "../../Utility/action.type"
function Payment() {
  const [{ basket, user }, dispatch] = useContext(DataContext)
  const totalproduct = basket.reduce((sum, item) => sum + item.amount, 0)
  const total = basket.reduce(
    (amount, item) => amount + item.price * item.amount,
    0
  )
  const [cardError, setCardError] = useState(null)

  const [processing, setProcessing] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const handelChane = (e) => {
    console.log(e)
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("")
  }
  const handelPaymnet = async (e) => {
    e.preventDefault()
    //1.
    // backend || function contact----to get client secret
    //use axios to communucat BE

    try {
      setProcessing(true)
      const responce = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      })
      console.log(responce.data)
      const clientSecrete = responce.data?.clientScret

      //2. client side(react side) cnfirmation using stripe
      //first paymentIntet was confiramtion and it is distract now
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecrete, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      console.log(paymentIntent)

      //3. after the confirmation ---> order firestore database save, clear basket
      //first please on service on firebase

      /*
      users{ 
      l1Oc490V0qVXFASobbQfLR0Gccz1
      orders{
      pi_3R22L8Rp8ZeEmsll02li8qLE
      {
      amount:199495
      created:1741836106
      basket {
      id: des: title: amount
      }
      
      }
      }
      
      
      }
      
      
      }
      
      */

      await db
        .collection("users") ///
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        })

      await db
        .collection("student")
        .doc("course_data")
        .set({ name: "MERN", job: "fullstack developer" })
      // console.log("done")
      //make empty basket
      dispatch({
        type: Type.EMPTY_BASKET,
      })
      setProcessing(false)
      navigate("/orders", { state: { msg: "you have placed new order" } })
    } catch (error) {
      setProcessing(false)
    }

    //3. after the confirmation ---> order firestore database save, clear basket
  }
  return (
    <LayOut>
      {/* header */}
      <div className={style.payment_header}>
        Checkout ({totalproduct}) items
      </div>
      {/* payment method */}
      <section className={style.paymnet}>
        {/* address */}
        <div className={style.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div className="">{user?.email}</div>
            <div className="">144 abced</div>
            <div className="">Sabiyan</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={style.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item, i) => (
              <>
                <p>Total amount: {item.amount}</p>
                <ProductCard key={i} data={item} flex={true} />
              </>
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={style.flex}>
          <h3>Payment Method</h3>
          <div className={style.payment_card_container}>
            <div className={style.payment_detailes}>
              <form onSubmit={handelPaymnet}>
                {/* error the card number */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* this is card */}
                <CardElement onChange={handelChane} />
                {/* total price */}
                <div className={style.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={style.loading}>
                        <ClipLoader color="gray" size={20} />
                        <p>Please wait</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  )
}

export default Payment
