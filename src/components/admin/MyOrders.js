import axios from "axios"
import {  useEffect, useState, useContext } from "react"
import { GlobalState } from "../../GlobalState"
import AllOrders from "./AllOrders"
import "./products.css"
import _ from "lodash";




const pageSize = 2;


function MyOrders() {

  const state =  useContext(GlobalState)
  const token = state.token
  const[items, setItems] = useState([])
  const [paginated, setPaginated] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  
  

  useEffect(() => {

    const getOrders = async() => {

        const res = await axios.get("https://newyoshopapi.onrender.com/cart/show_carts", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        setItems(res.data.result);
        setPaginated(_(res.data.result).slice(0).take(pageSize).value());
                



    }

    getOrders()



  }, [token])


  const pageCount = items ? Math.ceil(items.length / pageSize) : 0;

  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);


  const pagination = (pageNo) => {
    setCurrentPage(pageNo)
    const startIndex = (pageNo -1) * pageSize
    const paginate = _(items).slice(startIndex).take(pageSize).value()
    setPaginated(paginate)


  }






    return(
    <>
    <div className="products">
        


    {
        paginated?.map(item => {
            return(

                
                    item.products.map((order, index) => {

                        return(

                            <AllOrders key={index} order={order} 
                            amount={item.amount}
                            status={item.status}
                            user={item.user}
                            updated={item.updatedAt} />
                            
                        )



                    })
                
            )
        })
    }

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
    
    
    </>)


}


export default MyOrders