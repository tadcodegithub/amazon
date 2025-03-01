import React, { useContext } from "react"
import style from "./Cart.module.css"
import LayOut from "../../Components/LayOut/LayOut"
import ProductCard from "../../Components/Product/ProductCard"
import { DataContext } from "../../Components/DataProvider/DataProvide"
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat"
import { Link } from "react-router-dom"
import { Type } from "../../Utility/action.type"
import { IoIosArrowDown } from "react-icons/io"
import { IoIosArrowUp } from "react-icons/io"
function Cart() {
  const [{ basket }, dispatch] = useContext(DataContext)
  const total = basket.reduce(
    (amount, item) => amount + item.price * item.amount,
    0
  )
  // console.log(basket, total)
  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    })
  }
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    })
  }
  return (
    <LayOut>
      <section className={style.cart_container}>
        <div className={style.item_container}>
          <h2>hello</h2>
          <h3>Your Shopping Basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Oh! No item add yet</p>
          ) : (
            basket?.map((item, i) => {
              return (
                <section className={style.cart_product}>
                  <ProductCard
                    key={i}
                    data={item}
                    flex={true}
                    renderDesc={true}
                    renderAdd={false}
                  />
                  <div className={style.cart_addmin}>
                    <button className={style.btn} onClick={() => increment(item)}>
                      <IoIosArrowUp size={30} />
                    </button>
                    <span>{item.amount}</span>
                    <button className={style.btn} onClick={() => decrement(item.id)}>
                      <IoIosArrowDown size={30} />
                    </button>
                  </div>
                </section>
              )
            })
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={style.checkout_container}>
            <div className="">
              <p>Subtotal ({basket?.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments">Proceed to checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  )
}

export default Cart
