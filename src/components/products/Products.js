import { useState, useRef,  useContext } from "react"
import { GlobalState } from "../../GlobalState"
import { Row, Col, Button, Overlay, Popover } from 'react-bootstrap';
import ProductItem from "./ProductItem"
import { Link } from "react-router-dom";

function Products() {
    const state = useContext(GlobalState)

    
     const [products] = state.ProductsApi.products
     const [show, setShow] = useState(false);
     const [target, setTarget] = useState(null);
     const ref = useRef(null);
   
     const handleClick = (event) => {
       setShow(!show);
       setTarget(event.target);
     };



    

    return(

        <div className="container" style={{padding: "10px"}} >
            <div class="clearfix" ref={ref}>
            <Button onClick={handleClick}>product filters</Button>

<Overlay
  show={show}
  target={target}
  placement="bottom"
  container={ref}
  containerPadding={20}
>
  <Popover id="popover-contained">
    <Popover.Header as="h3">selections</Popover.Header>
    <Popover.Body>
      <Link to="/">by price (low to high)</Link>
    </Popover.Body>
  </Popover>
</Overlay>
                
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
    
    

    
    
    
    </div>
    )
}

export default Products