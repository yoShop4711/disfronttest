import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { GlobalState } from "../../GlobalState"
import MyWishlist from "./MyWishList"
import './products.css'
import _ from "lodash";
import Loading from "../products/Loading"




const pageSize = 3 ;


function MyWishlists() {

   const state = useContext(GlobalState)
   const token = state.token
   const[wishlists, setWishlists] = useState([])
   const [paginated, setPaginated] = useState();
   const [currentPage, setCurrentPage] = useState(1);
 

   useEffect(() => {
    const getWishLists = async() => {
        const res = await axios.get('/wish/user_wishlist', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })


        setWishlists(res.data.wishes);
        setPaginated(_(res.data.wishes).slice(0).take(pageSize).value());
        
    }

    getWishLists()

   }, [token])
   const pageCount =  wishlists ? Math.ceil(wishlists.length / pageSize) : 0;
   
 
   const pages = _.range(1, pageCount + 1);
 
 
   const pagination = (pageNo) => {
     setCurrentPage(pageNo)
     const startIndex = (pageNo -1) * pageSize
     const paginate = _(wishlists).slice(startIndex).take(pageSize).value()
     setPaginated(paginate)
 
 
   }
 
 
 
 
 if(wishlists.length === 0) {
    return <Loading />
 }


   


    return(
    <>
    <h1 className="text-center">my wishlists</h1>
    <div className="products">


        {

            paginated?.map((wishlist, index) => {
                return(
                    <MyWishlist key={index} wishlist={wishlist}  />
                )
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

    
    
    </div>
    
    </>)
}

export default MyWishlists