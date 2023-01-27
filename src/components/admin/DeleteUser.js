import { useParams } from "react-router-dom"
import axios from "axios"
import { GlobalState } from "../../GlobalState"
import { Button } from "react-bootstrap"
import "./user.css"
import { useContext } from "react"

function DeleteUser() {
    const {id} = useParams()
    
    const state = useContext(GlobalState)
      
    
    const token = state.token

    const deleteUser = async() => {
        
         const res = await axios.delete(`https://newyoshopapi.onrender.com/auth/delete_user/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        alert(res.data.msg);
        window.location.href = "/show_users"
    
    }



return(<div className="text-center centered">

<p>press button to delete user</p>

<Button onClick={deleteUser} className="btn btn-danger" >delete user</Button>


</div>)

}

export default DeleteUser