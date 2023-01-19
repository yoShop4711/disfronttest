import { useContext } from "react"
import {  useParams } from "react-router-dom"
import { GlobalState } from "../../GlobalState"
import { Button } from "react-bootstrap"
import axios from "axios"

function DeleteWishlists() {
    const state =  useContext(GlobalState)
    const token = state.token
    const {id} = useParams()


    const deleteUser = async() => {
        const res = await axios.delete(`/wish/delete_wish/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        alert(res.data.msg)
        window.location.href = '/my_wishlist'
 
        

    }
    
    
    return(<div className="text-center centered">

    <p>press button to delete wishlist</p>
    
    <Button onClick={deleteUser} className="btn btn-danger" >delete wishlist</Button>
    
    
    </div>

    )
}

export default DeleteWishlists