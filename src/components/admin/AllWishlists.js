import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { GlobalState } from "../../GlobalState"
import AllWishlist from "./AllWishlist"
import './products.css'
import _ from "lodash";
import Loading from "../products/Loading"




const pageSize = 3 ;


function AllWishlists() {
   const state = useContext(GlobalState)
   const token = state.token
  const[allWishlists, setAllWishlists] = useState([])
  const [paginated, setPaginated] = useState();
   const [currentPage, setCurrentPage] = useState(1);



useEffect(() => {

    const getAllWishes = async() => {

        const res = await axios.get('/wish/all_customer_wishes', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        setAllWishlists(res.data.wishes);
        setPaginated(_(res.data.wishes).slice(0).take(pageSize).value())

    }

    getAllWishes()

}, [token])

const pageCount =  allWishlists ? Math.ceil(allWishlists.length / pageSize) : 0;
   
 
const pages = _.range(1, pageCount + 1);


const pagination = (pageNo) => {
  setCurrentPage(pageNo)
  const startIndex = (pageNo -1) * pageSize
  const paginate = _(allWishlists).slice(startIndex).take(pageSize).value()
  setPaginated(paginate)


}




if(allWishlists.length === 0) {
 return <Loading />
}



    return(<div className="products">

        {
            paginated?.map((allWishlist, index) => {
                return(<AllWishlist key={index} allWishlist={allWishlist} />)
            })
        }

<br></br>

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



    
    </div>)
}

export default AllWishlists