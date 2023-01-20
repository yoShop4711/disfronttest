import { useContext, useEffect, useState } from "react"
import { GlobalState } from "../../GlobalState"
import axios from "axios"
import "./products.css"
import CancelNotProcessedOrder from "./CancelNotProcessedOrder"
import _ from "lodash";
import Loading from "../products/Loading"




const pageSize = 3 ;

function CanncelNotProcessedOrders() {
    const state = useContext(GlobalState)
   const token = state.token
   const [notProcessed, setNotProcessed] = useState([]);
   const [paginated, setPaginated] = useState();
   const [currentPage, setCurrentPage] = useState(1);


   useEffect(() => {
     const getNotProcessed = async () => {
       const res = await axios.get("/cart/show_user_not_processed_carts", {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });
 
    setNotProcessed(res.data.orders);
    setPaginated(_(res.data.orders).slice(0).take(pageSize).value());
     };
     getNotProcessed();
   }, [token]);

   const pageCount =  notProcessed ? Math.ceil(notProcessed.length / pageSize) : 0;
   
 
   const pages = _.range(1, pageCount + 1);
 
 
   const pagination = (pageNo) => {
     setCurrentPage(pageNo)
     const startIndex = (pageNo -1) * pageSize
     const paginate = _(notProcessed).slice(startIndex).take(pageSize).value()
     setPaginated(paginate)
 
 
   }
 
 
 
 
 if(notProcessed.length === 0) {
    return <Loading />
 }

 
 
 


    return(
        <div className="products">

{paginated?.map((order) => {
        return order.products.map((item, index) => {
          return (
            <CancelNotProcessedOrder
              key={index}
              item={item}
              amount={order.amount}
              status={order.status}
              order={order}
              
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



    

    
    </div>


    )
}

export default CanncelNotProcessedOrders