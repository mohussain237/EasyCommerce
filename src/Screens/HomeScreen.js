import React from "react";
import Products from "../Products";
import Product from "../Components/Product";
import { Row, Col } from "react-bootstrap";

const HomeScreen = () => {
  return (
    <>
      <h1>
        <em>LATEST GADGETS</em>
      </h1>
      <Row>
        {Products.map((product) => (
          <Col key={product._id} sm={10} md={5} lg={3} xl={2}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
