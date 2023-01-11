import { useContext, useEffect, useState } from "react"
import {GlobalState}  from "../../GlobalState"
import axios from "axios"
import { Link } from "react-router-dom"

function CustomersWithOrders() {
    const state = useContext(GlobalState)
    const token = state.token
    const[users] = state.UsersApi.users
    let [customerOrders, setCustomerOrders] = useState([])
    let resultt = []


    

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

    
    

    
    return(<>
    <h1 className="text-center">Customers With Orders</h1>

    

    


       {
       Array.from(uniques).map((customerOrder) => (
                 <CustomerWithOrder customer={customerOrder} users={users} />
            )
            )
        
    
    }       
    </>)
}


const CustomerWithOrder = ({customer, users}) => {
let[userOrder, setUserOrder] = useState([])


console.log(customer.user);

useEffect(() => {
    
    if(customer.user) {
    users.forEach((userId) => {
          if(userId._id === customer.user){

            setUserOrder(userId)

          }})

    }

    

}, [customer.user, users])




if(userOrder.length === 0) return null





    return(<div className="mx-auto text-center">
          <ul className="list-group">
            <li className="list-group-item"><Link to={`/user/${userOrder._id}`}>{userOrder.username}</Link></li>

        </ul> 
    </div>)
}


export default CustomersWithOrders