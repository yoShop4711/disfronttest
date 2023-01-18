import { useState, useEffect, useContext } from "react"
import { GlobalState } from "../../GlobalState"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import { Card } from "react-bootstrap"
import "./user.css"


function User() {
    const[users, setUsers] = useState([])
    const[single, setSingle] = useState([])
    const state = useContext(GlobalState)
    const[isAdmin] = state.userApi.isAdmin



    const token = state.token


    const {id} = useParams()
    const navigate = useNavigate()
    

    useEffect(() => {

        const showUsers = async() => {
        
    
                const res = await axios.get('/auth/show_users', {
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
      
      const handleClick = async (event) => {
        
        navigate('/users_orders', {state: {identifier: single._id } })

      }

       
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
{single.role === 1 ? <Card.Link href={`/show_merchant_products/${single._id}`} className="d-block p-2" >merchant's products </Card.Link> : null}
<Card.Link onClick={handleClick} className="d-block p-2">user's orders</Card.Link>
<Card.Link href={`/user_status/${single._id}`} className="d-block p-2">change user status</Card.Link>
<Card.Link href={`/delete_user/${single._id}`} className="d-block p-2">delete user</Card.Link>




</Card.Body>

</Card>

    </div>

)

}


export default User