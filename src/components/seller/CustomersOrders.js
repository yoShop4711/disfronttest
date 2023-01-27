import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { GlobalState } from "../../GlobalState"
import CustomerOrders from "./CustomerOrders"
import "./sellerProducts.css"
import Loading from "../products/Loading"
import _ from "lodash";




const pageSize = 3;

function CustomersOrders() {

   const state = useContext(GlobalState)
   const token = state.token
   const[products, setProducts] = useState([])
   const [paginated, setPaginated] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    
    
   useEffect(() => {
    const sellerProds = async() => {

        const res = await axios.get('https://newyoshopapi.onrender.com/api/seller_products', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        setProducts(res.data.products);
        setPaginated(_(res.data.products).slice(0).take(pageSize).value());
        


    }
    sellerProds()

}, [token])

const pageCount = products ? Math.ceil(products.length / pageSize) : 0;


const pages = _.range(1, pageCount + 1);


  const pagination = (pageNo) => {
      setCurrentPage(pageNo)
      const startIndex = (pageNo -1) * pageSize
      const paginate = _(products).slice(startIndex).take(pageSize).value()
      setPaginated(paginate)
  
  
    }
  
    if(products.length === 0) {
      return <Loading />
    }





      
   


    return(
        <>
        <h1 className="text-center">customer's orders</h1>
    <div className="products">
        {
            paginated?.map((product, index) => {
                return <CustomerOrders key={index} product={product} />
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

export default CustomersOrders