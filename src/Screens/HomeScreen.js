import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../Components/Product";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { Row, Col } from "react-bootstrap";
import { listProduts } from "../action/productAction";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, Products } = productList;

  useEffect(() => {
    dispatch(listProduts());
  }, [dispatch]);

  return (
    <>
      <h1>
        <em>LATEST GADGETS</em>
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varient="danger">{error}</Message>
      ) : (
        <Row>
          {Products.map((product) => (
            <Col key={product._id} sm={10} md={5} lg={3} xl={2}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
