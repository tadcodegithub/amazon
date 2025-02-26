import React from "react";
import styles from "./catagory.module.css";
import { Link } from "react-router-dom";
function CatagoryCard({data}) {
  return (
    <div className={styles.catagory}>
      <Link to={`/category/${data.name}`}>
        <span>
          {}
          <h2>{data.title}</h2>
        </span>
        <img src={data.imageLink} alt="" />
        <p>Shop Now</p>
      </Link>
    </div>
  );
}

export default CatagoryCard;
