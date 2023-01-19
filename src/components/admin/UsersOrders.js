import { useState, useEffect, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Loading from "../products/Loading";
import { Card} from "react-bootstrap"
import moment from "moment"
import "./products.css"
import _ from "lodash";




const pageSize = 3;



function UsersOrders() {
  const state = useContext(GlobalState);
  const token = state.token;
  const [items, setItems] = useState([]);
  const [paginated, setPaginated] = useState();
  const [currentPage, setCurrentPage] = useState(1);


  const location = useLocation();


  useEffect(() => {
    const getOrders = async () => {
      const res = await axios.get(
        `/cart/buyer_orders/${location.state.identifier}`,
        
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setItems(res.data.orders);
      setPaginated(_(res.data.orders).slice(0).take(pageSize).value());
       
      
    };

    getOrders();
  }, [token, location.state.identifier]);


  const pageCount = items ? Math.ceil(items.length / pageSize.length) : 0;

  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);


  const pagination = (pageNo) => {
    setCurrentPage(pageNo)
    const startIndex = (pageNo -1) * pageSize
    const paginate = _(items).slice(startIndex).take(pageSize).value()
    setPaginated(paginate)


  }




  if(items.length === 0) {
    return <Loading />
  }
  

  return (
    <>
    <div className="products">

    
{paginated?.map(item => {
            return(

                
                    item.products.map((order, index) => {

                        return(

                            <UserOrder key={index} order={order} 
                            amount={item.amount}
                            status={item.status}
                            user={item.user}
                            updated={item.updatedAt} />
                            
                        )



                    })
                
            )
        }) }

        <br></br>

        <nav className="d-flex justify-content-center">
        <ul className="pagination">
          {pages.map((page, index) => (
            <li
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
              key={index}
            >
            <p className="page-link" onClick={() => pagination(page)} > {page} </p>
            </li>
          ))}
        </ul>
      </nav>

        </div>
          </>
  );
}


const UserOrder = ({ order, amount, status, user, updated}) => {

  const state = useContext(GlobalState)
  const[products] = state.ProductsApi.products
  const[users] = state.UsersApi.users
  const[singleOrders, setSingleOrders] = useState([])
  const[buyer, setBuyer] = useState([])
  const[merchant, setMerchant] = useState([])



  useEffect(() => {

   if(order._id) {

products.forEach(product => {
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

  
  </>)
}

export default UsersOrders;
