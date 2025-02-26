import React from "react";
import CatagoryCard from "./CatagoryCard";
import { catagoryInfos } from "./catagoryFullinfos";
import styles from "./catagory.module.css";
function Catagory() {
  return (
    <section className={styles.catagory_container}>
      {catagoryInfos?.map((sinleProduct, i) => {
        return <CatagoryCard key={i} data={sinleProduct} />;
      })}
    </section>
  );
}

export default Catagory;
