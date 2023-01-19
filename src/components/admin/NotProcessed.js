import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import NotProcessedItem from "./NotProcessedItem";
import "./products.css"
import Loading from "../products/Loading";
import _ from "lodash";




const pageSize = 3;



function NotProcessed() {
    const state = useContext(GlobalState)
    const token = state.token
    const[notProceSsed, setNotProcessed] = useState([])
    const [paginated, setPaginated] = useState();
    const [currentPage, setCurrentPage] = useState(1);
  

    useEffect(() => {

        const getNotProcessed = async() => {

            const res = await axios.get("/cart/show_not_processed", {
                headers: {
                    Authorization: `Bearer ${token}`

                }
            })

            setNotProcessed(res.data.not_processed);
            setPaginated(_(res.data.not_processed).slice(0).take(pageSize).value());


        }

        getNotProcessed()

    }, [token])

    const pageCount = notProceSsed ? Math.ceil(notProceSsed.length / pageSize.length) : 0;

  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);


  const pagination = (pageNo) => {
    setCurrentPage(pageNo)
    const startIndex = (pageNo -1) * pageSize
    const paginate = _(notProceSsed).slice(startIndex).take(pageSize).value()
    setPaginated(paginate)


  }



if(notProceSsed.length === 0) {
  return <Loading />
}

    return(<div className="products">
    {paginated.map((notProcess) => {
        return notProcess.products.map((item, index) => {
          return (
            <NotProcessedItem
              key={index}
              item={item}
              amount={notProcess.amount}
              status={notProcess.status}
              user={notProcess.user}
              updated={notProcess.updatedAt}
              notProcess={notProcess}
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

export default NotProcessed