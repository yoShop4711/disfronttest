import { useState,  useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { Row, Col } from "react-bootstrap";
import ProductItem from "./ProductItem";
import Loading from "./Loading";





function Products() {
  const state = useContext(GlobalState);

  const [categories] = state.CategoriesApi.categories;
  const [sort, setSort] = state.ProductsApi.sort;
  const [search, setSearch] = state.ProductsApi.search;
  const [products] = state.ProductsApi.products;
  const [categor, setCategory] = state.ProductsApi.categor
  const [paginated] = state.ProductsApi.paginated
  const pages = state.ProductsApi.pages
  const pagination = state.ProductsApi.pagination
  const [currentPage] = state.ProductsApi.currentPage


  const handleCategory = e => {
    setCategory(e.target.value)
    setSearch('')
    

}


if(products.products === null || products.products === undefined){ return <div>
  <Loading />
  
  </div>}



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
                    <option value='sort=oldest'>Oldest</option>
                    <option value='sort=-productPrice'>Price: High-Low</option>
                    <option value='sort=productPrice'>Price: Low-High</option>
                </select> 

                
      
        
      </div>
<div style={{padding: "10px"}}>
      <Row>
        {paginated.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}   >
        
          
            <ProductItem product={product} />
            
          
          </Col>
        ))}
      </Row>
      </div>



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

      
    </div>
  );
}

export default Products;
