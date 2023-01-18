import axios from "axios"
import {useEffect, useState, useContext} from "react"
import {GlobalState} from "../../GlobalState"
import IndividualProducts from "./IndividualProducts"
import "./sellerProducts.css"
import Loading from "../products/Loading"
import _ from "lodash";




const pageSize = 3;


function SellerProducts() {
    const state = useContext(GlobalState)

    const[products, setProducts] = useState([])
    const token = state.token
    const [paginated, setPaginated] = useState();
    const [currentPage, setCurrentPage] = useState(1);


    

    useEffect(() => {
        const sellerProds = async() => {

            const res = await axios.get('/api/seller_products', {
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

  if (pageCount === 1) return null;

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

    

    return(<>
        <h1 className="text-center">my products</h1>

    <div className="products">
        
    
    {
paginated.map(product => {
    return <IndividualProducts key={product._id} product={product} />
})
    }

    <br>
    </br>

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


export default SellerProducts