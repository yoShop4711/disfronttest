import { useContext, useEffect, useState } from "react"
import {GlobalState}  from "../../GlobalState"
import axios from "axios"
import CustomerWithOrder from "./CustomerWithOrder"
import _ from "lodash";




const pageSize = 2;


function CustomersWithOrders() {
    const state = useContext(GlobalState)
    const token = state.token
    const[users] = state.UsersApi.users
    let [customerOrders, setCustomerOrders] = useState([])
    let resultt = []
    const [paginated, setPaginated] = useState();
    const [currentPage, setCurrentPage] = useState(1);
  





    

    useEffect(() => {

        const getOrders = async() => {

            const res = await axios.get('https://newyoshopapi.onrender.com/cart/show_carts', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setCustomerOrders(res.data.result);
            setPaginated(_(res.data.result).slice(0).take(pageSize).value());
        

        }

        getOrders()

    }, [token])


    let uniques =  customerOrders.filter(cus => {
        let isDup = resultt.includes(cus.user)
        if(!isDup) {
          resultt.push(cus.user)
          return true  
        }
        return false
    })

    const pageCount = uniques ? Math.ceil(uniques.length / pageSize) : 0;

  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);


  const pagination = (pageNo) => {
    setCurrentPage(pageNo)
    const startIndex = (pageNo -1) * pageSize
    const paginate = _(customerOrders).slice(startIndex).take(pageSize).value()
    setPaginated(paginate)


  }

if(uniques.length === 0) return null

    
    
    return(<>
    <h1 className="text-center">Customers With Orders</h1>

    
        {
       Array.from(paginated).map((customerOrder) => (
                 <CustomerWithOrder customer={customerOrder} users={users} />
            )
            )
        
    
    }   
    <div style={{padding: "10"}}>

    </div>

    
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


    
    </>)
}






export default CustomersWithOrders