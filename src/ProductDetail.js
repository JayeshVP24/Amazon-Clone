import React from "react"
import "./ProductDetail.css"

function ProductDetail({ match }) {
  return (
    <div className="productDetail">
      <p>{match.params.id}</p>
    </div>
  )
}

export default ProductDetail
