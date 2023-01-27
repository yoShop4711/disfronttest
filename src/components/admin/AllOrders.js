import { useContext, useEffect, useState } from "react"
import { GlobalState } from "../../GlobalState"
import { Card} from "react-bootstrap"
import moment from "moment"




function Orders({order, amount, status, user, updated}) {
  
  


   const state = useContext(GlobalState)
   const[products] = state.ProductsApi.products
   const[users] = state.UsersApi.users
   const[singleOrders, setSingleOrders] = useState([])
   const[buyer, setBuyer] = useState([])
   const[merchant, setMerchant] = useState([])



   useEffect(() => {

    if(order._id) {

products.products.forEach(product => {
    if(product._id === order._id) setSingleOrders(product)
})

    }

   }, [order._id, products])


   useEffect(() => {

    if(user) {
        users.forEach(person => {
          if(person._id === user)  setBuyer(person) 
        })
    }

  }, [user, users])

  useEffect(() => {

    if(singleOrders.createdBy) {
      users.forEach(use => {
        if(use._id === singleOrders.createdBy) setMerchant(use)
      })
    }

  }, [singleOrders.createdBy, users])





  if(singleOrders.length === 0) return null

  
       const picture = singleOrders.productImage.data.data

   

   const base64String =  window.btoa(
    new Uint8Array(picture)
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  );





  if(buyer.length === 0) return null;

  if(singleOrders.length === 0) 
      return <h2 style={{textAlign: "center", fontSize: "5rem"}}>No Orders</h2> 

      

    return(<>
    <div className="col-md-10 mx-auto ">
      <Card className=" my-3 p-2 flex-fill h-150 "> 
      <Card.Img src={`data:image/jpg;base64, ${base64String}`}  className="img-responsive" variant="top" />
      <Card.Body>
      <Card.Text as="span">seller: </Card.Text>
        <Card.Link href={`/user/${merchant._id}`}>
         {merchant.fullname} 

        </Card.Link>
        
        <div style={{padding: "5px"}}>

        </div>
        <Card.Text as="span">buyer: </Card.Text>
        <Card.Link href={`/user/${buyer._id}`}>
         {buyer.fullname} 

        </Card.Link>

        <div style={{padding: "5px"}}>
          </div>

          <Card.Text as="p">
          Product: <em> {singleOrders.productName} </em>
          </Card.Text>

          <Card.Text as="p">
          Price: <em>MK{amount}</em>
          </Card.Text>

          <Card.Text as="p">
          status: <em> {status} </em>
          </Card.Text>

          <Card.Text as="p">
          number of products: <em>{order.count}</em>
          </Card.Text>

          <Card.Text as="p">
          Last updated {moment(updated).fromNow()}
          </Card.Text>
          
          







      </Card.Body>
      </Card>
      
      
    </div>




 </>   

)
}

export default Orders