import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../GlobalState";
import { Card } from "react-bootstrap";



function AllWishlist({allWishlist}) {

     const state = useContext(GlobalState)
     const[users] = state.UsersApi.users
     const[wishCreator, setWishCreator] = useState([])

    

     useEffect(() => {
        if(allWishlist.createdBy) {
            users.forEach(person => {
                if(person._id === allWishlist.createdBy)  setWishCreator(person) 
              })

        }


     }, [users, allWishlist.createdBy])

     
     



    if(allWishlist.length === 0 ) return null

    const picture = allWishlist.productImage.data.data
  
      const base64String =  window.btoa(
          new Uint8Array(picture)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
  

    return(
        <>
        <div className="col-md-11 mx-auto ">
        <Card className=" my-3 p-2 flex-fill h-150 "> 
      <Card.Img src={`data:image/jpg;base64, ${base64String}`} style={{width: "100%"}}  className="img-responsive" variant="top" />
      <Card.Body>
        <Card.Text as="p">
        wish by:  {wishCreator.fullname}
        </Card.Text>

        <Card.Text as="p">
        {allWishlist.productName}
        </Card.Text>
        <Card.Text as="p">
        Last updated {moment(allWishlist.createdAt).fromNow()}
        </Card.Text>


        </Card.Body>
        </Card>
        </div>
        
        
        
        </>
    
    
    
    )
}

export default AllWishlist