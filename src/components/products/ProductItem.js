import { useEffect, useState, useContext } from "react"
import { GlobalState } from "../../GlobalState"
import { Card } from 'react-bootstrap';
import 'animate.css'
import { Link } from "react-router-dom";



function ProductItem({product}) {
const state = useContext(GlobalState)
const[users] = state.UsersApi.users
const[single, setSingle] = useState([])



useEffect(() => {

    if(product.createdBy) {

        users.forEach(user => {
            if(user._id === product.createdBy) setSingle(user)


        })


    }

}, [product.createdBy, users])


 
const picture = product.productImage.data.data

const base64String =  window.btoa(
    new Uint8Array(picture)
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  );


    return(

<>

         

<Card className="my-3 p-2 rounded  animate__animated animate__fadeInUp  flex-fill h-80  "  > 
<Link to={`/detail/${product._id}`}>
    <Card.Img src={`data:image/jpg;base64, ${base64String}`} className="img-responsive" variant="top" />
    </Link>

    <Card.Body>
    <Card.Title as="p">
            <strong>{product.productName}</strong>
          </Card.Title>

          <Card.Text as="h3">
            <strong>MK {product.productPrice}</strong>

          </Card.Text>

          <Card.Text as="div">
            <strong>Seller: {single.fullname}</strong>

          </Card.Text>




    </Card.Body>


</Card>


</>

    
    )
}

export default ProductItem
