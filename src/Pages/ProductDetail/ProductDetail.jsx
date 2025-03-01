import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import LayOut from "../../Components/LayOut/LayOut"
import axios from "axios"
import { productUrl } from "../../Api/endPoints"
import ProductCard from "../../Components/Product/ProductCard"
import Loader from "../../Components/Loader/Loader"

function ProductDetail() {
  const { productId } = useParams()
  // console.log(productId)

  const [product, SetProducts] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        // console.log(res)
        SetProducts(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        // console.log(err);
      })
  }, [])
  // console.log(product)

  return (
  <LayOut>

{isLoading?(<Loader />):(<ProductCard data={product} flex={true} renderDesc={true}/>)}
 </LayOut>)
}

export default ProductDetail
