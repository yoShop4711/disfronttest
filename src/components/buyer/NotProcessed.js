import moment from "moment"
import { useContext, useEffect, useState } from "react"
import { GlobalState } from "../../GlobalState"
import { Card } from "react-bootstrap";



function NotProcessed({item, amount, status, updated}) {
    
     const state = useContext(GlobalState)
     const[products] = state.ProductsApi.products
    const[users] = state.UsersApi.users
    const[prods, setProds] = useState([])
    const[merchant, setMerchant] = useState([])

    useEffect(() => {



        if(item._id) {
            products.products.forEach(product => {
    
                if(product._id === item._id) setProds(product)
    
    
            })
        }
    
    }, [item._id, products])

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
  
    

    return(

        <>
        <div className="col-md-11 mx-auto ">
        <Card className=" my-3 p-2 flex-fill h-150 "> 
      <Card.Img src={`data:image/jpg;base64, ${base64String}`} style={{width: "100%"}}  className="img-responsive" variant="top" />
      <Card.Body>
        <Card.Text as="p">
        Seller:  {merchant.fullname}
        </Card.Text>
        <Card.Text as="p">
        Product:  {prods.productName} 
        </Card.Text>
        <Card.Text as="p">
        Price: MK {amount}
        </Card.Text>
        <Card.Text as="p">
        status:  {status}
        </Card.Text>

        <Card.Text as="p">
        order placed on {moment(updated).fromNow()}
        </Card.Text>



      </Card.Body>
        
        </Card>
        </div>
        
        </>
    )
}

export default NotProcessed