import moment from "moment";
import WishManageBtn from "./WishManageBtn";
import { Card } from "react-bootstrap";


function MyWishlist({wishlist}) {

    if(wishlist.length === 0) return null

    const picture = wishlist.productImage.data.data
  
      const base64String =  window.btoa(
          new Uint8Array(picture)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
  

    return(
        <>
        <div className="col-md-11 mx-auto ">
        <Card className=" my-3 p-2 flex-fill h-150 "> 
      <Card.Img src={`data:image/jpg;base64, ${base64String}`}  className="img-responsive" variant="top" />
      <Card.Body>
        <Card.Text as="p">
       product: {wishlist.productName}

        </Card.Text>

        <Card.Text as="p">
     {wishlist.productDescription}

        </Card.Text>

      </Card.Body>

      </Card>




        </div>
    
    {/* <div className="product_card">
        <img  src={`data:image/jpg;base64, ${base64String}`} alt={wishlist.productName} />
        <div className="product_box">
        <h3> <em> {wishlist.productName} </em> </h3>
        <p><em> {wishlist.productDescription} </em> </p>


        <small>Last updated {moment(wishlist.createdAt).fromNow()}</small>


        </div>

    <WishManageBtn wishlist={wishlist} />
    
    
    
    </div> */}
    
    </>)
}

export default MyWishlist