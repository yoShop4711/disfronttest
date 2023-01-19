import moment from "moment";
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
      <Card.Img src={`data:image/jpg;base64, ${base64String}`} style={{width: "100%"}}  className="img-responsive" variant="top" />
      <Card.Body>
        <Card.Text as="p">
       product: {wishlist.productName}

        </Card.Text>

        <Card.Text as="p">
     {wishlist.productDescription}

        </Card.Text>
        <Card.Text as="p">
        wish created at {moment(wishlist.createdAt).fromNow()}
        </Card.Text>

        <Card.Link href={`/update_wishlist/${wishlist._id}`}>
          update wishlist
    </Card.Link>
    <Card.Link href={`/delete_wishlist/${wishlist._id}`}>
       delete wishlist
    </Card.Link>
    
      </Card.Body>

      </Card>




        </div>
    
    
    </>)
}

export default MyWishlist