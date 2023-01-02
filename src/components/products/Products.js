import { useState, useContext } from "react"
import { GlobalState } from "../../GlobalState"
import { Row, Col } from 'react-bootstrap';

// import "./products.css"
import ProductItem from "./ProductItem"
import Filters from "./Filters"
import LoadMore from "./LoadMore"
import Loading from "./Loading"

function Products() {
    const state = useContext(GlobalState)

    
     const [products] = state.ProductsApi.products
    const [loading, setLoading] = useState(false)



    

    if(loading) return <div><Loading /></div>
    return(

        <>
        <div className="clearfix">
            <span className="float-left">
                <h1>latest products...</h1>
            </span>
            <span className="float-right">
                <h1>filters babes</h1>
            </span>



        </div>
        <Row>
        {
        products.map(product => (
            <Col key={product._id}  sm={12} md={6} lg={4} xl={3}>

             <ProductItem  product={product}  />
             </Col>
        ))
       } 


        </Row>
    
    

    
    {/* <div className="products">



       {
        products.map(product => {
            return <ProductItem key={product._id} product={product}  />
        })
       } 
    
    </div>

    <LoadMore />
        {products.length === 0 && <Loading />} */}

    
    </>
    )
}

export default Products