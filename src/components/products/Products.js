import { useState,  useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { Row, Col } from "react-bootstrap";
import ProductItem from "./ProductItem";
import LoadMore from "./LoadMore";



function Products() {
  const state = useContext(GlobalState);

  const [categories] = state.CategoriesApi.categories;
  const [sort, setSort] = state.ProductsApi.sort;
  const [search, setSearch] = state.ProductsApi.search;
  const [products] = state.ProductsApi.products;
  const [categor, setCategory] = state.ProductsApi.categor
  


  const handleCategory = e => {
    setCategory(e.target.value)
    setSearch('')
    

}






  return (
    <div className="container" >
      <div class=" d-flex justify-content-evenly" >
      
                <select name="categor" value={categor} onChange={handleCategory} >
                    <option value=''>All Products</option>
                    {
                        categories.map(categor => (
                            <option value={"categor=" + categor._id} key={categor._id}>
                                {categor.name}
                            </option>
                        ))
                    }
                </select>

                

                <select value={sort} onChange={e => setSort(e.target.value)} >
                    <option value=''>Newest</option>
                    <option value='sort=-productPrice'>Price: High-Low</option>
                    <option value='sort=productPrice'>Price: Low-High</option>
                </select>

                
      
        
      </div>
<div style={{padding: "10px"}}>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}   >
        
          
            <ProductItem product={product} />
            
          
          </Col>
        ))}
      </Row>
      </div>

<LoadMore />
      
      
    </div>
  );
}

export default Products;
