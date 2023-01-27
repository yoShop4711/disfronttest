import  { useEffect, useState, useContext } from "react"
import { GlobalState } from "../../GlobalState"
import axios from 'axios'
import "./filter.css"
import Table from "./Table"


function FilterUsers() {
    const[users, setUsers] = useState([])
    const[query, setQuery] = useState("")
    const state = useContext(GlobalState)
    const[isAdmin] = state.userApi.isAdmin

    const token = state.token


    useEffect(() => {
        const showUsers = async() => {
            if(isAdmin) {
    
                const res = await axios.get('https://newyoshopapi.onrender.com/auth/show_users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
    
                setUsers(res.data.users); 
                        
                       }
        }
    
        showUsers()
    

    }, [token, isAdmin])


    const handleChange = (event) => {
setQuery(event.target.value)

    }




    return(<div className="app">
    <input type="text" placeholder="search...." value={query} className="search" onChange={handleChange} />

    <Table users={users} query={query} />

    {/* <ul className="list">
        {users.filter((user) => user.username.includes(query)).map((user) => (
            <li className="listItem" key={user._id}>{user.username}</li>

        ))}

    </ul>
     */}
    </div>)
}

export default FilterUsers