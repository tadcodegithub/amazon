import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import LayOut from "../../Components/LayOut/LayOut"
import axios from "axios"
import { productUrl } from "../../Api/endPoints"
import ProductCard from "../../Components/Product/ProductCard"

function ProductDetail() {
  const { productId } = useParams()
  const [product, SetProducts] = useState({})
  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => {
        // console.log(res)
        SetProducts(res.data)
      })
      .catch((err) => {
        // console.log(err);
      })
  }, [])
  // console.log(product)

  return (
    <LayOut>
      {/* {console.log(product.rating ? "rating" : "not rating")} */}
      {product.rating ? (
        <ProductCard data={product} />
      ) : (
        <p>Loding product details</p>
      )}
    </LayOut>
  )
}

export default ProductDetail
