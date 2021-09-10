import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { listProdutDetails } from "../action/productAction";
// import Rating from "../Components/Rating";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";

import Message from "../Components/Message";
import Rating from "../Components/Rating";
import Loader from "../Components/Loader";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  useEffect(() => {
    dispatch(listProdutDetails(match.params.id));
  }, [dispatch, match]);
  return (
    <>
      {/* PRODUCT IMAGE CARD  */}

      <Link className="btn btn-outline-secondary my-4" to="/">
        <strong> Go Back</strong>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varient="danger">{error}</Message>
      ) : (
        <Row className="mt-4">
          <Col md={4}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>

          {/* ADDING FEATURES OF THE PRODUCT IN A COMMON CARD */}

          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup>
                <ListGroup.Item>
                  <h3> {product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    fluid
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong> Price : </strong>
                  Rs {product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong> Catogory :</strong> {product.category}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong> Discription :</strong>
                  {product.description}
                </ListGroup.Item>
              </ListGroup>
            </ListGroup>
          </Col>

          {/* ADDING "ADD TO CART" EVENT WITH TOTAL ADDED AMOUNT */}

          <Col md={3} className="mx-1">
            <Card>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Price :</Col>
                    <Col>
                      <strong>Rs {product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status :</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty :</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {" "}
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Row>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
