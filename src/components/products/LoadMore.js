
import { useContext } from 'react'
import {GlobalState} from '../../GlobalState'
// import "./products.css"


function LoadMore() {
    const state = useContext(GlobalState)
   
    const [page, setPage] = state.ProductsApi.page
    const [result] = state.ProductsApi.result
    
    // console.log(state);

    
    return (
        <div className="load_more">
            {
                result < page * 8 ? ""
                : <button className='btn btn-danger text-center' onClick={() => setPage(page+1)}>Load more</button>
            }
        </div>
    )
}

export default LoadMore
