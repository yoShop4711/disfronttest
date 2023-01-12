import axios from "axios"
import {  useEffect, useState, useContext } from "react"
import { GlobalState } from "../../GlobalState"
import AllOrders from "./AllOrders"
import OrdersPagination from "./OrdersPagination"
import "./products.css"


function MyOrders() {

  const state =  useContext(GlobalState)
  const token = state.token
  const[items, setItems] = useState([])
  const[currentPage, SetCurrentPage] = useState(1)
  const[ordersPerPage] = useState(2)
  

  useEffect(() => {

    const getOrders = async() => {

        const res = await axios.get("https://newyoshopapi.onrender.com/cart/show_carts", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        setItems(res.data.result);



    }

    getOrders()



  }, [token])


  const indexOfLastName = currentPage + ordersPerPage
const indexOfFirstName = indexOfLastName - ordersPerPage
const orderItems = items.slice(indexOfFirstName, indexOfLastName)


const paginate = (pageNumber) => SetCurrentPage(pageNumber)

  



    return(<div className="products">


     {
        orderItems.map(item => {
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
     
    <OrdersPagination currentPage={currentPage} totalOrders={orderItems} paginate={paginate} />
    
    </div>)


}


export default MyOrders