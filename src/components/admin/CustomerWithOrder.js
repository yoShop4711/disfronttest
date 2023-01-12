import {  useEffect, useState } from "react"

const CustomerWithOrder = ({customer, users}) => {
    const[userOrder, setUserOrder] = useState([])
    
    
    useEffect(() => {
        
        if(customer.user) {
        users.forEach((userId) => {
              if(userId._id === customer.user){
    
                setUserOrder(userId)
                
    
              }})
    
        }
    
        
    
    }, [customer.user, users])
    
    if(userOrder.length === 0) return null
    
    
    
    
    
        return(<div>
    
    
      
    
               <ul className="list-group">
                <li className="list-group-item">{userOrder.username}</li>
    
            </ul> 
    
    
    
        </div>)
    }
    

    export default CustomerWithOrder