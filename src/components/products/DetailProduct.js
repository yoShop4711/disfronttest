import { useParams, Link, useNavigate } from "react-router-dom"
import {GlobalState} from "../../GlobalState"
import ProductItem from "./ProductItem"
import "./detailProduct.css"
import { useEffect, useState, useContext } from "react"
import { Card } from 'react-bootstrap';
import {addItem} from "../../api/CartApi"




function  DetailProduct() {
   const {id} = useParams()
   const state = useContext(GlobalState)
   const [products] = state.ProductsApi.products
   const [detailProduct, setDetailProduct] = useState([])
   const[users] = state.UsersApi.users
   const[single, setSingle] = useState([])
   const navigate = useNavigate()
    const [redirect, setRedirect] = useState(false);

    const addToCart = () => {
        addItem(detailProduct, () => {

            setRedirect(true);
        })

    };

    const shouldRedirect = redirect => {
        if (redirect) {
            return navigate('/cart');
        }
    };



   useEffect(() => {

    if(detailProduct.createdBy) {

        users.forEach(user => {
            if(user._id === detailProduct.createdBy) setSingle(user)


        })


    }

}, [detailProduct.createdBy, users])




   

   useEffect(() => {

    if(id) {
        products.products.forEach(product => {
            if(product._id === id) setDetailProduct(product)
        })


    }


   }, [id, products])

   if(detailProduct.length === 0) return null;

   const picture = detailProduct.productImage.data.data

   

   const base64String =  window.btoa(
    new Uint8Array(picture)
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  );





    return(
    <>
     {shouldRedirect(redirect)}

<Card className="my-3 p-3 rounded  ">
<Card.Img src={`data:image/jpg;base64, ${base64String}`} style={{width: "100%", height: "100%"}} variant="top" />

    </Card>
    <div className="detail">

<div className="box_detail">
    <div className="row">

        <h2>{detailProduct.productName}</h2>



    </div>

               <span> MK {detailProduct.productPrice}</span>
                    <p>{detailProduct.productDescription}</p>
                    <p>Seller: {single.fullname}</p>

                    <Link to="#!"   onClick={addToCart}>
                   <button className="btn btn-danger"> Buy Now </button>
                    </Link>


</div>
    
    </div> 


    <div>
                <h2>Related products</h2>
                <div className="products">
                    {
                        products.products.map(product => {
                            return product.categor === detailProduct.categor 
                                ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>

    
    
    
    
    </>)
}

export default DetailProduct