import { Col, Row } from "antd";
import React from "react";
import Product from "../Product";
import "./styles.scss";

function ProductList(props) {
  const { products } = props;
  return (
    <div className="products">
      <Row gutter={16}>
        {products?.length > 0 ? (
          products.map((product, index) => (
            <Col key={index} span={6}>
              <Product product={product} />
            </Col>
          ))
        ) : (
          <div className="no-products">Not found product </div>
        )}
      </Row>
    </div>
  );
}

export default ProductList;
