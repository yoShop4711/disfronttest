import { useContext, useEffect, useState } from "react"
import {GlobalState}  from "../../GlobalState"
import axios from "axios"
import { Link } from "react-router-dom"

function CustomersWithOrders() {
    const state = useContext(GlobalState)
    const token = state.token
    const[users] = state.UsersApi.users
    const[customerOrders, setCustomerOrders] = useState([])


    

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


    
    

    
    return(<>
    <h1 className="text-center">Customers With Orders</h1>

    {
       Array.from(customerOrders).map((customerOrder, index) => {
            return <CustomerWithOrder key={index} customerOrder={customerOrder} users={users} />
        })
    }
    
    
    </>)
}


const CustomerWithOrder = ({customerOrder, users}) => {
let[userOrder, setUserOrder] = useState([])



useEffect(() => {
    
    if(customerOrder.user) {
    users.forEach((userId) => {
          if(userId._id === customerOrder.user) setUserOrder(userId) 
    } )

    }

    


               

}, [customerOrder.user, users])




               






if(userOrder.length === 0) return null

// console.log(userOrder);



    return(<div>
          {/* <ul className="list-group">
            <li className="list-group-item"><Link to={`/user/${userOrder._id}`}>{userOrder.username}</Link></li>

        </ul>  */}
    </div>)
}


export default CustomersWithOrders