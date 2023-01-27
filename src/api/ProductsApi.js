import { useState, useEffect } from "react"
import axios from "axios"
import _ from "lodash";


const pageSize = 4;


function ProductsSApi() {
    const [products, setProducts] = useState([])
    const [callback, setCallback] = useState(false)
    const [name, setName] = useState('')
    const [sort, setSort] = useState(false)
    const [categor, setCategory] = useState('')
    const [search, setSearch] = useState('')
    // const [result, setResult] = useState(0)
    const [paginated, setPaginated] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    const res =  axios.get(`/api/show_products?${categor}&${sort}&title[regex]=${search}`) 
    useEffect( () => {
        try  {
    
            
                 const getProds  = async() => {
                     
                    const {data} = await   res
    
                    
    
                setProducts(data)
                
                setPaginated(_(data.products).slice(0).take(pageSize).value());
                
                
        }
    
        getProds()
    
        
            
        } catch (error) {
            console.log(error)
            
        }
    
        
    
    }, [res, callback, name, sort, search,  categor])
    
    
const pageCount = products.products ? Math.ceil(products.products.length / pageSize) : 0;


const pages = _.range(1, pageCount + 1);


const pagination = (pageNo) => {
  setCurrentPage(pageNo)
  const startIndex = (pageNo -1) * pageSize
  const paginate = _(products.products).slice(startIndex).take(pageSize).value()
  setPaginated(paginate)


}



    return{

        products: [products, setProducts],
        callback: [callback, setCallback],
        name: [name, setName],
        sort: [sort, setSort],
        categor: [categor, setCategory],
        search: [search, setSearch],
        pagination: pagination,
        pages: pages,
        paginated: [paginated, setPaginated],
        currentPage: [currentPage, setCurrentPage]

    }
}

export default ProductsSApi