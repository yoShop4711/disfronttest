import  { useEffect, useState, useContext } from "react"
import { GlobalState } from "../../GlobalState"
import axios from 'axios'
import { Link } from "react-router-dom"
import _ from "lodash";


const pageSize = 2;


function ShowSellers() {
  const state = useContext(GlobalState)
  const[sellers, setSellers] = useState([])
  const [paginated, setPaginated] = useState();
  const [currentPage, setCurrentPage] = useState(1);

    
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
    
                setSellers(res.data.sellers); 
                setPaginated(_(res.data.sellers).slice(0).take(pageSize).value());
                 
                       }
        }
    
        ShowSeller()
    

    }, [token, isAdmin])

    

    const pageCount = sellers ? Math.ceil(sellers.length / pageSize) : 0;

  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNo) => {
    setCurrentPage(pageNo)
    const startIndex = (pageNo -1) * pageSize
    const paginate = _(sellers).slice(startIndex).take(pageSize).value()
    setPaginated(paginate)


  }



    
    return(<div >
        <h1 className="text-center text-blue-600">VENDORS</h1>
  
        

        {!paginated ? (
        " users are loading "
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>username</th>
              <th>fullname</th>
              <th>email</th>
              <th>location</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((seller, index) => {
              return (
                <tr key={index}>
                  <td>
                    {" "}
                    <Link to={`/user/${seller._id}`}>{seller.username}</Link>
                  </td>
                  <td>{seller.fullname}</td>
                  <td>{seller.email}</td>
                  <td>{seller.location}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          {pages.map((page, index) => (
            <li
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
              key={index}
            >
            <p className="page-link" onClick={() => pagination(page)} > {page} </p>
            </li>
          ))}
        </ul>
      </nav>

    
    </div>
    )
}

export default ShowSellers