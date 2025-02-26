import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import styles from "./product.module.css";
import { Link } from "react-router-dom";
function ProductCard({ data }) {
//   console.log(data);
  const { image, title, id, rating, price } = data;
  return (
    <div className={styles.card_container}>
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div className="">
        <h3>{title}</h3>
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
      </div>
      <button className={styles.button}>add to cart</button>
    </div>
  );
}

export default ProductCard;
