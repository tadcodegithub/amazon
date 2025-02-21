import React from "react";
import styles from "./catagory.module.css";
function CatagoryCard({data}) {
  return (
    <div className={styles.catagory}>
      <a href="">
        <span>
          {}
          <h2>{data.title}</h2>
        </span>
        <img src={data.imageLink} alt="" />
        <p>Shop Now</p>
      </a>
    </div>
  );
}

export default CatagoryCard;
