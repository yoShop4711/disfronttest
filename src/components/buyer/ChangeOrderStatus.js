import axios from "axios";
import {  useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import { Container,  Row, Col, Button, Form } from 'react-bootstrap';



function ChangeOrderStatus() {
    const { id } = useParams();
  const state = useContext(GlobalState);
  const token  = state.token
  const[status, setStatus] = useState("")
  const[enam, setEnam] = useState([])

  


  useEffect(() => {

    const getEnam = async () => {
      const res = await axios.get('https://newyoshopapi.onrender.com/cart/show_status', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setEnam(res.data);

    }

    getEnam()


  }, [token])

  const handleChangeInput = (event) => {

    setStatus(event.target.value)

  }

  

    const updateOrder = async(event) => {
      event.preventDefault()
         await axios.put(`https://newyoshopapi.onrender.com/cart/update_status/${id}`, {status}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        alert("order cancelled successfully")

        window.location.href="/cancel_not_processed_carts"

    }



  
    
    return(
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>

            <h1>cancel this order..</h1>
<Form onSubmit={updateOrder}>
  <Form.Group>
      <Form.Select name="status" value={status} onChange={handleChangeInput}>
        <option value="">
          select a category

        </option>
        <option>{enam[3]}</option>

      </Form.Select>
      </Form.Group>
      <br>
      </br>

<Button variant="danger" type="submit" >submit</Button>

</Form>
</Col>
</Row>

    </Container>



      
    )
}

export default ChangeOrderStatus