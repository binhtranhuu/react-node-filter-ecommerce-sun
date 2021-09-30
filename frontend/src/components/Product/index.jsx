import React from "react";
import Rating from "../Rating";
import "./styles.scss";

function Product(props) {
  const { product } = props;
  return (
    <div className="product">
      <figure className="product__media">
        <img src={product.image} alt="Product" />
      </figure>
      <div className="product__body">
        <h3 className="product__name">{product.name}</h3>
        <div className="product__meta">
          <div className="product__rating">
            <Rating rating={product.rating} />
          </div>
          <div className="product__price">${product.price}</div>
        </div>
      </div>
    </div>
  );
}

export default Product;
