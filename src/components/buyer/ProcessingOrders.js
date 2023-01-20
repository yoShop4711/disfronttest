import { useContext, useEffect, useState } from "react"
import { GlobalState } from "../../GlobalState"
import axios from "axios"
import "./products.css"
import ProcessingOrder from "./ProcessingOrder"
import _ from "lodash";
import Loading from "../products/Loading"




const pageSize = 3 ;



function ProcessingOrders() {
     
   const state = useContext(GlobalState)
   const token = state.token
   const [processingOrders, setProcessingOrder] = useState([]);
   const [paginated, setPaginated] = useState();
   const [currentPage, setCurrentPage] = useState(1);


   useEffect(() => {
     const getProcessing = async () => {
       const res = await axios.get("/cart/show_user_processing_carts", {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });
 
    setProcessingOrder(res.data.orders);
    setPaginated(_(res.data.orders).slice(0).take(pageSize).value());
     };
     getProcessing();
   }, [token]);

   const pageCount =  processingOrders ? Math.ceil(processingOrders.length / pageSize) : 0;
   
 
   const pages = _.range(1, pageCount + 1);
 
 
   const pagination = (pageNo) => {
     setCurrentPage(pageNo)
     const startIndex = (pageNo -1) * pageSize
     const paginate = _(processingOrders).slice(startIndex).take(pageSize).value()
     setPaginated(paginate)
 
 
   }
 
 
 
 
 if(processingOrders.length === 0) {
    return <Loading />
 }

 

     
    return(<div className="products">
        

{paginated?.map((order) => {
        return order.products.map((item, index) => {
          return (
            <ProcessingOrder
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

export default ProcessingOrders