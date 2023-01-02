import { useState, useContext } from "react"
import { GlobalState } from "../../GlobalState"
import { Row, Col } from 'react-bootstrap';
import ProductItem from "./ProductItem"
import Meta from "./Meta";

function Products() {
    const state = useContext(GlobalState)

    
     const [products] = state.ProductsApi.products
    



    

    return(

        <>
        <Meta />
        
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