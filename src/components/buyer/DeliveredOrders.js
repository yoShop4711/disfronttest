import { useContext, useEffect, useState } from "react"
import { GlobalState } from "../../GlobalState"
import axios from "axios"
import "./products.css"
import DeliveredOrder from "./DeliveredOrder"
import _ from "lodash";
import Loading from "../products/Loading"




const pageSize = 3 ;



function DeliveredOrders() {
     
   const state = useContext(GlobalState)
   const token = state.token
   const [deliveredOrders, setDeliveredOrders] = useState([]);
   const [paginated, setPaginated] = useState();
   const [currentPage, setCurrentPage] = useState(1);
 


   useEffect(() => {
     const getDelivered = async () => {
       const res = await axios.get("https://newyoshopapi.onrender.com/cart/show_user_delivered_carts", {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });
 
    setDeliveredOrders(res.data.orders);
    setPaginated(_(res.data.orders).slice(0).take(pageSize).value());
     };
     getDelivered();
   }, [token]);

   const pageCount =  deliveredOrders ? Math.ceil(deliveredOrders.length / pageSize) : 0;
   
 
   const pages = _.range(1, pageCount + 1);
 
 
   const pagination = (pageNo) => {
     setCurrentPage(pageNo)
     const startIndex = (pageNo -1) * pageSize
     const paginate = _(deliveredOrders).slice(startIndex).take(pageSize).value()
     setPaginated(paginate)
 
 
   }
 
 
 
 
 if(deliveredOrders.length === 0) {
    return <Loading />
 }

 

     
    return(<div className="products">
        

{paginated?.map((order) => {
        return order.products.map((item, index) => {
          return (
            <DeliveredOrder
              key={index}
              item={item}
              amount={order.amount}
              status={order.status}
              updated={order.updatedAt}
            />
          );
        });
      })}

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



    

    
    </div>)
}

export default DeliveredOrders