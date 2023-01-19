import axios from "axios";
import { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import { Container, Form, Row, Col, Button } from "react-bootstrap";


function CreateWishlist() {
  const state = useContext(GlobalState);
  const [wishlist, setWishlist] = useState({
    productName: "",
    productDescription: "",
    productImage: false,
  });

  const [isBuyer] = state.userApi.isBuyer;
  const token = state.token;

  const handleChangeInput = (event) => {
    if (event.target.name === "productImage") {
      setWishlist({ [event.target.name]: event.target.files[0] });
    } else {
      const { name, value } = event.target;
      setWishlist({ ...wishlist, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isBuyer) return alert("you are not a seller");

    let formData = new FormData();

    formData.append("productName", wishlist.productName);
    formData.append("productDescription", wishlist.productDescription);
    formData.append("productImage", wishlist.productImage);

    const res = await axios.post("/wish/create_wishlist", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert(res.data.msg);
    window.location.href = "/my_wishlist";
  };

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h1>Create Your Wishlist</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUserimage">
                <Form.Label>upload your photo</Form.Label>
                <Form.Control
                  type="file"
                  name="productImage"
                  onChange={handleChangeInput}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicProductName">
                <Form.Label>enter your product name</Form.Label>
                <Form.Control
                  type="text"
                  name="productName"
                  value={wishlist.productName}
                  onChange={handleChangeInput}
                  placeholder="enter your product name"
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="formBasicPrductDescription"
              >
                <Form.Label>enter your product description </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="productDescription"
                  value={wishlist.productDescription}
                  onChange={handleChangeInput}
                  placeholder="enter your product description"
                />
              </Form.Group>
              <Button variant="warning" type="submit">
        create your wishlist
      </Button>

            </Form>
          </Col>
        </Row>
      </Container>
    </>

    
  );
}

export default CreateWishlist;
