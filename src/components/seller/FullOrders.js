import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { GlobalState } from "../../GlobalState";
import { Card} from "react-bootstrap"



function FullOrders({prods, items}) {
    const state =  useContext(GlobalState)
    const[products] = state.ProductsApi.products
    const[users] = state.UsersApi.users
    const[goods, setGoods] = useState([])
    const[buyer, setBuyer] = useState([])
    
    

    

    useEffect(() => {

        if(prods._id) {
            products.forEach((product) => {
                if(product._id === prods._id) setGoods(product)

            })

        }

    }, [prods._id, products])

    useEffect(() => {

        if(items.user) {
          users.forEach(use => {
            if(use._id === items.user) setBuyer(use)
          })
        }
    
      }, [items.user, users])
   


  
    if(goods.length === 0) return null

  
      const picture = goods.productImage.data.data
  
      const base64String =  window.btoa(
          new Uint8Array(picture)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );

        

      



    return(<>

<div className="col-md-10 mx-auto ">
    <Card className=" my-3 p-2 flex-fill h-150 "> 
      <Card.Img src={`data:image/jpg;base64, ${base64String}`}  className="img-responsive" variant="top" />
      <Card.Body>
        <Card.Text as="p">
          Buyer
        </Card.Text>
      <Card.Link href={`/buyer_profile/${items.user}`}>
{buyer.fullname}
        
      </Card.Link>
    <Card.Text as="p">
    product:  {goods.productName} 
    </Card.Text>
    <Card.Text as="p">
    price: MK {items.amount}
    </Card.Text>
    <Card.Text as="p">
    status:  {items.status}
    </Card.Text>
    <Card.Text as="p">
    number of products: {prods.count}
    </Card.Text>
    <Card.Text as="p">
    Last updated {moment(items.updatedAt).fromNow()}
    </Card.Text>


        </Card.Body>
        </Card>


        </div>







    </>)
}

export default FullOrders