import moment from "moment"
import { useContext, useEffect, useState } from "react"
import { GlobalState } from "../../GlobalState"
import { Card } from "react-bootstrap"


function CancelledItems({item, user, amount, status, updated}) {

    const state = useContext(GlobalState)
    
    const[products] = state.ProductsApi.products
    const[users] = state.UsersApi.users
    const[prods, setProds] = useState([])
    const[buyer, setBuyer] = useState([])
    const[merchant, setMerchant] = useState([])

    useEffect(() => {



    if(item._id) {
        products.products.forEach(product => {

            if(product._id === item._id) setProds(product)


        })
    }





    }, [item._id, products])


    useEffect(() => {

      if(user) {
          users.forEach(person => {
            if(person._id === user)  setBuyer(person) 
          })
      }

    }, [user, users])

    useEffect(() => {

      if(prods.createdBy) {
        users.forEach(use => {
          if(use._id === prods.createdBy) setMerchant(use)
        })
      }
  
    }, [prods.createdBy, users])
  


    if(prods.length === 0) return null;


    const picture = prods.productImage.data.data

    const base64String =  window.btoa(
        new Uint8Array(picture)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );



      
      if(buyer.length === 0) return null;

   
      if(prods.length === 0) return null

    
    

    return(
<div className="col-md-10 mx-auto ">

<Card className=" my-3 p-2 flex-fill h-150 ">
<Card.Img src={`data:image/jpg;base64, ${base64String}`}  className="img-responsive" variant="top" />
<Card.Body>
<Card.Text as="span">
        seller:
        </Card.Text>
        <Card.Link href={`/user/${merchant._id}`}>
        {merchant.fullname}
        </Card.Link>
        <div style={{padding: "5px"}}>

        </div>
        <Card.Text as="span">
          buyer:
        </Card.Text>
        <Card.Link href={`/user/${buyer._id}`}>
        {buyer.fullname}
        </Card.Link>
        <div style={{padding: "5px"}}>

        </div>
        <Card.Text as="p">
         product: {prods.productName}  
        </Card.Text>
        <Card.Text as="p">
          MK {amount}

        </Card.Text>

        <Card.Text as="p">
        status: {status}
        </Card.Text>

        <Card.Text as="p">
  number of products: {item.count}
</Card.Text>
<Card.Text as="p">
Last updated {moment(updated).fromNow()}

</Card.Text>

</Card.Body>

    </Card>






        {/* <div className="row row-cols-3">
<div className="col">


<div className="card">
    <img className="card-img-top" src={`data:image/jpg;base64, ${base64String}`} alt={prods.productName} />
    <div className="card-body">
    <h2 className="card-title text-danger">Seller's name: <em> {merchant.fullname} </em></h2>
      <h2 className="card-title">Buyer's name: <em> {buyer.fullname} </em></h2>
      <h2>Product's name: <em> {prods.productName} </em> </h2>
      <h5 className="card-title">product price: <em>MK{amount}</em></h5>
      <h5 className="card-title">product status: <em> {status} </em></h5>
      <h5 className="card-title">number of products: <em>{item.count}</em> </h5>

    </div>
    <div className="card-footer">
      <small className="text-muted">Last updated {moment(updated).fromNow()}</small>
    </div>
  </div>

</div> */}



        </div>

    )
}

export default CancelledItems