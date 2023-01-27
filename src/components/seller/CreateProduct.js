import axios from "axios";
import { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { Container, Form, Row, Col, Button } from "react-bootstrap";



function CreateProduct() {
  const state = useContext(GlobalState);

  const [product, setProduct] = useState({
    productName: "",
    productDescription: "",
    productQuantity: "",
    productAvailability: "",
    categor: "",
    productPrice: "",
  });

  const[productImage, setProductImage] = useState(null)

  const [categories] = state.CategoriesApi.categories;
  const [isSeller] = state.userApi.isSeller;
  const token = state.token;

  const handleChangeInput = (event) => {

      const { name, value } = event.target;
      setProduct({ ...product, [name]: value });
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isSeller) return alert("you are not a seller");

    let formData = new FormData();

    formData.append("productName", product.productName);
    formData.append("productDescription", product.productDescription);
    formData.append("productQuantity", product.productQuantity);
    formData.append("productAvailability", product.productAvailability);
    formData.append("productImage", productImage);
    formData.append("categor", product.categor);
    formData.append("productPrice", product.productPrice);

    const res = await axios.post("https://newyoshopapi.onrender.com/api/create_product", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert(res.data.msg);
    window.location.href = "/my_products";
  };

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h1>Create Your Product</h1>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Form.Group className="mb-3" controlId="formBasicProductimage">
                <Form.Label>upload product photo</Form.Label>
                <Form.Control
                  type="file"
                  onChange={event => setProductImage(event.target.files[0])}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>enter your product name</Form.Label>
                <Form.Control
                  type="text"
                  name="productName"
                  value={product.productName}
                  onChange={handleChangeInput}

                  placeholder="enter product name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label>enter your product price</Form.Label>
                <Form.Control
                  type="text"
                  name="productPrice"
                  value={product.productPrice}
                  onChange={handleChangeInput}
                
                  placeholder="enter product price"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>enter your product description</Form.Label>
                <Form.Control
                  type="text"
                  name="productDescription"
                  value={product.productDescription}
                  onChange={handleChangeInput}
    
                  placeholder="enter product description"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicQuantity">
                <Form.Label>enter your product quantity</Form.Label>
                <Form.Control
                  type="text"
                  name="productQuantity"
                  value={product.productQuantity}
                  onChange={handleChangeInput}
                  
                  placeholder="enter product quantity"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAvailability">
                <Form.Label>product availability</Form.Label>
                <Form.Control
                  type="text"
                  name="productAvailability"
                  value={product.productAvailability}
                  onChange={handleChangeInput}
            
                  placeholder="write if product is available right now"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCategories">
                <Form.Label>select product categories</Form.Label>
                <Form.Select
                  name="categor"
                  value={product.categor}
                  onChange={handleChangeInput}
                >
                  <option value="">Please select a category</option>
                  {categories.map((category) => (
                    <option value={category._id} key={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Button variant="warning" type="submit">
                create your product
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

          </>
  );
}

export default CreateProduct;
