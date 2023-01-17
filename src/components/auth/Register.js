import  React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Form, Row, Col, Button } from 'react-bootstrap';


function Register() {
  
  const [values, setValues] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    userImage: false,
    location: "",
    question: ""

  });

  const handleChange = (event) => {
    if(event.target.name === "userImage") {
      setValues({[event.target.name]: event.target.files[0]})

    } else{
    const {name, value} = event.target;
    setValues({...values, [name]:value})

    }

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let formData = new FormData()

    formData.append('fullname', values.fullname)
    formData.append('username', values.username)
    formData.append('password', values.password)
    formData.append('email', values.email)
    formData.append('userImage', values.userImage)
    formData.append('location', values.location)
    formData.append('question', values.question)
    
    
     const res =  await axios.post('/auth/register', formData)

      localStorage.setItem('firstLogin', true)

      alert(res.data.msg)

      window.location.href = '/login'
    
  }

  return (
    <Container>
    <Row className="justify-content-md-center">
      <Col xs={12} md={6}>
      <h1>Register An Account</h1>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicUserimage">
        <Form.Label>upload your photo</Form.Label>
        <Form.Control type="file" name="userImage"  onChange={handleChange}  />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicFullname">
        <Form.Label>enter your fullname</Form.Label>
        <Form.Control type="text" name="fullname" value={values.fullname} onChange={handleChange} placeholder="enter your fullname" />
       
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>enter your username</Form.Label>
        <Form.Control type="text" name="username" value={values.username} onChange={handleChange} placeholder="enter your username" />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLocation">
        <Form.Label>enter your country</Form.Label>
        <Form.Control type="text" name="location" value={values.location} onChange={handleChange} placeholder="enter your location" />
       
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>enter your email address</Form.Label>
        <Form.Control type="email" name="email" value={values.email} onChange={handleChange} placeholder="enter your email" />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicQuestion">
        <Form.Label>enter a unique word to help in password reset</Form.Label>
        <Form.Control type="text" name="question" value={values.question} onChange={handleChange} placeholder="enter your unique " />
       
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>enter your pasword</Form.Label>
        <Form.Control type="text" name="password" value={values.password} onChange={handleChange} placeholder="enter your password" />
       
      </Form.Group>


      <Button variant="warning" type="submit">
        Submit
      </Button>


      


      </Form>
      </Col>
    </Row>
    <Row className="py-3">
          <Col>
            have an account?
            <Link to="/login">login</Link>
          </Col>
          <Col className="text-right">
            <Link to="/forgot">Forgot Password</Link>
          </Col>
        </Row>

  </Container>

      );
}

export default Register;
