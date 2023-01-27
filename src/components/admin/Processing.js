import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import ProcessingItem from "./ProcessingItem";
import Loading from "../products/Loading"
import "./products.css"
import _ from "lodash";




const pageSize = 3;



function Processing() {

    const state = useContext(GlobalState)
    const token = state.token
    const[proceSsing, setProcessing] = useState([])
    const [paginated, setPaginated] = useState();
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {

        const getProcessing = async () => {

            const res = await axios.get("https://newyoshopapi.onrender.com/cart/show_processing", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setProcessing(res.data.processing);
            setPaginated(_(res.data.processing).slice(0).take(pageSize).value());


        }

        getProcessing()


    }, [token])

    const pageCount = proceSsing ? Math.ceil(proceSsing.length / pageSize) : 0;

  

  const pages = _.range(1, pageCount + 1);


  const pagination = (pageNo) => {
    setCurrentPage(pageNo)
    const startIndex = (pageNo -1) * pageSize
    const paginate = _(proceSsing).slice(startIndex).take(pageSize).value()
    setPaginated(paginate)


  }
if(proceSsing.length === 0) {
  return <Loading />
}
    


    return(<>
     <h1 className="text-center">orders which are being processed</h1>

    <div className="products">
     
{paginated.map((process) => {
        return process.products.map((item, index) => {
          return (
            <ProcessingItem
              key={index}
              item={item}
              amount={process.amount}
              status={process.status}
              user={process.user}
              updated={process.updatedAt}
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





</div>    
    
    </>)
}

export default Processing