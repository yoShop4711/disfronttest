import { useContext, useEffect, useState } from "react"
import {GlobalState}  from "../../GlobalState"
import axios from "axios"
import Pagination from "./Pagination"
import CustomerWithOrder from "./CustomerWithOrder"





function CustomersWithOrders() {
    const state = useContext(GlobalState)
    const token = state.token
    const[users] = state.UsersApi.users
    let [customerOrders, setCustomerOrders] = useState([])
    let resultt = []
    const[currentPage, SetCurrentPage] = useState(1)
const[customersPerPage] = useState(2)




    

    useEffect(() => {

        const getOrders = async() => {

            const res = await axios.get('https://newyoshopapi.onrender.com/cart/show_carts', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setCustomerOrders(res.data.result);

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

    const indexOfLastName = currentPage + customersPerPage
const indexOfFirstName = indexOfLastName - customersPerPage
const currentName = uniques.slice(indexOfFirstName, indexOfLastName)



const paginate = (pageNumber) => SetCurrentPage(pageNumber)

// const pagination = (pageNo) => {
//     // setCurrentPage(pageNo)
//     SetCurrentPage(pageNo)
//     const startIndex = (pageNo -1) * customersPerPage
//     const paginate = _(uniques).slice(startIndex).take(pageSize).value()
//     setPaginated(paginate)


//   }




    
    return(<>
    <h1 className="text-center">Customers With Orders</h1>

    
        {
       Array.from(currentName).map((customerOrder) => (
                 <CustomerWithOrder customer={customerOrder} users={users} />
            )
            )
        
    
    }    

    <Pagination currentPage={currentPage} totalCustomers={currentName.length} paginate={paginate} />    
    </>)
}






export default CustomersWithOrders