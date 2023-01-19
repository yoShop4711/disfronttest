import {useContext, useState, useEffect} from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import {GlobalState} from "../../GlobalState"
import Loading from "../products/Loading"
import { Row, Col, Card } from "react-bootstrap";
import {Link} from "react-router-dom"
import _ from "lodash";




const pageSize = 4;


function ShowMerchantProducts() {
    const state = useContext(GlobalState)
    const {id} = useParams()
    const[users] = state.UsersApi.users
    const[items, setItems] = useState([])
    const token = state.token;
    const [paginated, setPaginated] = useState();
    const [currentPage, setCurrentPage] = useState(1);
  
    
    useEffect(() => {

        const merchantProducts = async() => {

            const res = await axios.get(`/api/see_seller_products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setItems(res.data.products);
            setPaginated(_(res.data.products).slice(0).take(pageSize).value());
        


        }

        merchantProducts()

    }, [id, token])

    const pageCount = items ? Math.ceil(items.length / pageSize.length) : 0;

    if (pageCount === 1) return null;
  
    const pages = _.range(1, pageCount + 1);
  
  
    const pagination = (pageNo) => {
      setCurrentPage(pageNo)
      const startIndex = (pageNo -1) * pageSize
      const paginate = _(items).slice(startIndex).take(pageSize).value()
      setPaginated(paginate)
  
  
    }
  
  
  


if(items.length === 0) {
    return <Loading />
}
  


    return(<>
    <h1 className="text-center">merchant's products</h1>
    
    <Row>
    
    {
paginated.map((item, index) => {

    return  <Col key={index} sm={12} md={6} lg={4} xl={3}   >
         <ShowMerchProducts   item={item} users={users}  />
         </Col>

})
    }

    </Row>

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


    </>)
}

const ShowMerchProducts = ({ item, users})  => {

    const[identify, setIdentify] = useState([])

 useEffect(() => {

    if(item.createdBy) {

        users.forEach(user => {
            if(user._id === item.createdBy) setIdentify(user)


        })


    }

}, [item.createdBy, users])

    



 
const picture = item.productImage.data.data

const base64String =  window.btoa(
    new Uint8Array(picture)
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  );





    return(<>
    

<Card className="my-3 p-2 rounded  animate__animated animate__fadeInUp  flex-fill h-80  "  > 
<Link to={`/detail/${item._id}`}>
    <Card.Img src={`data:image/jpg;base64, ${base64String}`} className="img-responsive" variant="top" />
    </Link>

    <Card.Body>
    <Card.Title as="p">
            <strong>{identify.fullname}</strong>
          </Card.Title>

    <Card.Title as="p">
            <strong>{item.productName}</strong>
          </Card.Title>

          <Card.Text as="h3">
            <strong>MK {item.productPrice}</strong>

          </Card.Text>
          
          



    </Card.Body>


</Card>
    
    
    
    </>)

}


export default ShowMerchantProducts