import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
} from "react-bootstrap";

import Rating from "../Components/Rating";
import axios from "axios";

const ProductScreen = ({ match }) => {
  const [product, setproduct] = useState({});

  useEffect(() => {
    const fetchproduct = async () => {
      const { data } = await axios.get(
        `/api/products/${match.params.id}`
      );

      setproduct(data);
    };
    fetchproduct();
  }, []);
  return (
    <>
      {/* PRODUCT IMAGE CARD  */}

      <Link classNmae="btn btn-outline-secondary my-4" to="/">
        <strong> Go Back</strong>
      </Link>
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
                <strong> Catogory :</strong> {product.catagory}
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
                      {product.countInStock > 0
                        ? "In Stock"
                        : "Out Of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Button
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
    </>
  );
};

export default ProductScreen;
