import React, { useContext } from "react"
import Rating from "@mui/material/Rating"
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat"
import styles from "./product.module.css"
import { Link } from "react-router-dom"
import { DataContext } from "../DataProvider/DataProvide"
import { Type } from "../../Utility/action.type"
function ProductCard({ data, flex, renderDesc ,renderAdd }) {
    // console.log(data);
  const { image, title, id, rating, price, description } = data

  const [state,dispatch]=useContext(DataContext)
  // console.log(state);
  
  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, id, rating, price, description },
    })
  }
  return (
    <div
      className={`${styles.card_container} ${
        flex ? styles.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div className="">
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "600px" }}>{description}</div>}
        <div className={styles.rating}>
          {/* rating */}
          <Rating value={rating.rate} precision={0.1} />
          {/* {ratin counter} */}
          <small>{rating.count}</small>
        </div>
        <div className="">
          {/* //price */}
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={styles.button} onClick={addToCart}>
            add to cart
          </button>
        )}
        
      </div>
    </div>
  )
}

export default ProductCard
