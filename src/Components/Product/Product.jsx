import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import styles from "./product.module.css";
function Product() {
  const [products, setProducts] = useState();
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        console.log(res);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <section className={styles.product_container}>
      {products?.map((singleProduct, i) => {
        return <ProductCard key={i} data={singleProduct} />;
      })}
    </section>
  );
}

export default Product;
