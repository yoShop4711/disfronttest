import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import DeliverTable from "./DeliverTable";
import "./products.css"
import Loading from "../products/Loading"
import _ from "lodash";




const pageSize = 3;



function Delivered() {
  const state = useContext(GlobalState);
  const token = state.token;
  const [deliVered, setDelivered] = useState([]);
  const [paginated, setPaginated] = useState();
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    const getDelivered = async () => {
      const res = await axios.get("/cart/show_delivered", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDelivered(res.data.delivered);
      setPaginated(_(res.data.delivered).slice(0).take(pageSize).value());

    };
    getDelivered();
  }, [token]);

  const pageCount = deliVered ? Math.ceil(deliVered.length / pageSize) : 0;

  

  const pages = _.range(1, pageCount + 1);


  const pagination = (pageNo) => {
    setCurrentPage(pageNo)
    const startIndex = (pageNo -1) * pageSize
    const paginate = _(deliVered).slice(startIndex).take(pageSize).value()
    setPaginated(paginate)


  }


  if(deliVered.length === 0) {
    return <Loading />
  }

  return (
    <>
    <h1 className="text-center">orders which have been delivered</h1>
    <div className="products">

      {paginated.map((deliver) => {
        return deliver.products.map((item, index) => {
          return (
            <DeliverTable
              key={index}
              item={item}
              amount={deliver.amount}
              status={deliver.status}
              user={deliver.user}
              updated={deliver.updatedAt}
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
    </>
  );
}

export default Delivered;
