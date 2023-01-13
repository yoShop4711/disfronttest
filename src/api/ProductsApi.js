import { useState, useEffect } from "react"
import axios from "axios"
import _ from "lodash";


const pageSize = 4;


function ProductsSApi() {
    const [products, setProducts] = useState([])
    const [callback, setCallback] = useState(false)
    const [name, setName] = useState('')
    const [sort, setSort] = useState('')
    const [categor, setCategory] = useState('')
    const [search, setSearch] = useState('')
    const [result, setResult] = useState(0)
    const [paginated, setPaginated] = useState();
    const [currentPage, setCurrentPage] = useState(1);


useEffect(() => {

    const getProducts = async() => {

        const res = await axios.get(`https://newyoshopapi.onrender.com/api/show_products?${categor}&${sort}&title[regex]=${search}`)
        setProducts(res.data.products)
        setResult(res.data.result)
        setPaginated(_(res.data.products).slice(0).take(pageSize).value());
        
        


    }
    getProducts()


}, [callback, name, sort, search,  categor])

const pageCount = products ? Math.ceil(products.length / pageSize) : 0;

if (pageCount === 1) return null;

const pages = _.range(1, pageCount + 1);


const pagination = (pageNo) => {
  setCurrentPage(pageNo)
  const startIndex = (pageNo -1) * pageSize
  const paginate = _(products).slice(startIndex).take(pageSize).value()
  setPaginated(paginate)


}



    return{

        products: [products, setProducts],
        callback: [callback, setCallback],
        name: [name, setName],
        sort: [sort, setSort],
        categor: [categor, setCategory],
        search: [search, setSearch],
        result: [result, setResult],
        pagination: pagination,
        pages: pages,
        paginated: [paginated, setPaginated],
        currentPage: [currentPage, setCurrentPage]

    }
}

export default ProductsSApi