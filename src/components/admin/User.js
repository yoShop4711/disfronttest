import { useState, useEffect, useContext } from "react"
import { GlobalState } from "../../GlobalState"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Card } from "react-bootstrap"
import "./user.css"


function User() {
    const[users, setUsers] = useState([])
    const[single, setSingle] = useState([])
    const state = useContext(GlobalState)
    const[isAdmin] = state.userApi.isAdmin

    const token = state.token


    const {id} = useParams()
    

    useEffect(() => {

        const showUsers = async() => {
        
    
                const res = await axios.get('https://newyoshopapi.onrender.com/auth/show_users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
    
                setUsers(res.data.users); 
                       
                       
        }
    
        showUsers()

        

        
    }, [isAdmin, token])


    useEffect(() => {

        if(id) {
            users.forEach(user => {
                if(user._id === id) setSingle(user)
                
                
                
                
            })
        }
    


    }, [id, users])

    if(single.length === 0) return null;
    const picture = single.userImage.data.data

    const base64String =  window.btoa(
        new Uint8Array(picture)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      

       
return(
<div className="col-md-6 mx-auto text-center">
{/* my-6 p-6 */}

<Card >
<Card.Img src={`data:image/jpg;base64, ${base64String}`} style={{width: "100%", height: "100%"}} variant="top" />
<Card.Body>
<Card.Title as="div">{single.fullname}</Card.Title>
<Card.Text as="p">username: {single.username}</Card.Text>
<Card.Text as="p">email: {single.email}</Card.Text>
<Card.Text as="p">location: {single.location}</Card.Text>
<Card.Link href={`/user_status/${single._id}`}>change user status</Card.Link>
<Card.Link href={`/delete_user/${single._id}`}>delete user</Card.Link>




</Card.Body>

</Card>






    
    




    </div>

)

}


export default User