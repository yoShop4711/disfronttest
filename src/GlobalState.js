import { createContext} from "react"
import UserApi from "./api/UserApi"
import UsersApi from "./api/UsersApi"
import CategoriesApi from "./api/CategoriesApi"
import ProductsApi from "./api/ProductsApi"




export const GlobalState = createContext()



export const DataProvider = ({children}) => {
    let token = JSON.parse(JSON.stringify(localStorage.getItem('token')))




const state = {


    userApi: UserApi(),
    UsersApi: UsersApi(),
    CategoriesApi: CategoriesApi(),
    ProductsApi: ProductsApi(),
    token: token
    
    



}


return (
    <GlobalState.Provider value={state}>
        {children}
    
    </GlobalState.Provider>
)



}



