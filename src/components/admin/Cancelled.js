import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import CancelledItems from "./CancelledItems";
import Loading from "../products/Loading"
import "./products.css"
import _ from "lodash";




const pageSize = 3;


function Cancelled() {
    const state = useContext(GlobalState)
    const token = state.token
    const[canceLled, setCancelled] = useState([])
    const [paginated, setPaginated] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    
    useEffect(() => {
        const getCancelled = async() => {
            const res = await axios.get("/cart/show_cancelled", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setCancelled(res.data.cancelled);
            setPaginated(_(res.data.cancelled).slice(0).take(pageSize).value());


        }

        getCancelled()

    }, [token])

    const pageCount = canceLled ? Math.ceil(canceLled.length / pageSize.length) : 0;

    if (pageCount === 1) return null;
  
    const pages = _.range(1, pageCount + 1);
  
  
    const pagination = (pageNo) => {
      setCurrentPage(pageNo)
      const startIndex = (pageNo -1) * pageSize
      const paginate = _(canceLled).slice(startIndex).take(pageSize).value()
      setPaginated(paginate)
  
  
    }
  
  
    if(canceLled.length === 0) {
      return <Loading />
    }
  


    

    return(<div className="products">
     {paginated.map((cancel) => {
        return cancel.products.map((item, index) => {
          return (
            <CancelledItems
              key={index}
              item={item}
              amount={cancel.amount}
              status={cancel.status}
              user={cancel.user}
              updated={cancel.updatedAt}
            />
          );
        });
      })}

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





    
    
    
    </div>)
}

export default Cancelled