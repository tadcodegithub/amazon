import React from "react";
import { IoMenuOutline } from "react-icons/io5";
import styles from "./header.module.css";
function LowerHeader() {
  return (
    <div className={styles.lower_header}>
      <ul>
        <li>
          <IoMenuOutline /> <p>ALL</p>
        </li>
        <li>Today's DEales</li>
        <li>Costumer Servies</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader;
