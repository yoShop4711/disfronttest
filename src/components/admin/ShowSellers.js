import  { useEffect, useState, useContext } from "react"
import { GlobalState } from "../../GlobalState"
import axios from 'axios'

import { Link } from "react-router-dom"



function ShowSellers() {
    const[vendors, setVendors] = useState([])
    const state = useContext(GlobalState)

    const[isAdmin] = state.userApi.isAdmin

    const token = state.token


    useEffect(() => {
        const ShowSeller = async() => {
            if(isAdmin) {
    
                const res = await axios.get('https://newyoshopapi.onrender.com/auth/show_sellers', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
    
                setVendors(res.data.sellers); 
                 
                       }
        }
    
        ShowSeller()
    

    }, [token, isAdmin])


    
    return(<div >
        <h1 className="text-center text-blue-600">VENDORS</h1>

        <table className="table-auto md:table-auto">
        <thead>
          <tr>
            <th>username</th>
            <th>fullname</th>
            <th>email</th>
            <th>location</th>
          </tr>
        </thead>
        <tbody>
        {
            vendors.map((vendor, index) => {
                return <tr key={index}>
                    <td style={{
                    padding: "10px",
                    border: "1px solid black",
                    color: "blue",
                  }}><Link to={`/user/${vendor._id}`}>{vendor.username}</Link></td>
                  <td style={{ padding: "10px", border: "1px solid black" }}>
                  {vendor.fullname}
                </td>
                <td style={{ padding: "10px", border: "1px solid black" }}>
                  {vendor.email}
                </td>
                <td style={{ padding: "10px", border: "1px solid black" }}>
                  {vendor.location}
                </td>


                </tr>

            })
        }

        </tbody>



        </table>

    
    </div>
    )
}

export default ShowSellers