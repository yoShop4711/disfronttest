import { Card} from "react-bootstrap"



function IndividualProducts({product}) {


    const picture = product.productImage.data.data

   

    const base64String =  window.btoa(
     new Uint8Array(picture)
       .reduce((data, byte) => data + String.fromCharCode(byte), '')
   );
 


    return(<>
    <div className="col-md-10 mx-auto ">
    <Card className=" my-3 p-2 flex-fill h-150 "> 
      <Card.Img src={`data:image/jpg;base64, ${base64String}`}  className="img-responsive" variant="top" />
      <Card.Body>
      <Card.Text as="p">

        {product.productName}
      </Card.Text>
    <Card.Text as="p">
   MK {product.productPrice}
    </Card.Text>
    <Card.Text as="p">
    {product.productDescription}
    </Card.Text>
    <Card.Link href={`/edit_product/${product._id}`}>
      edit product
    </Card.Link>
    <Card.Link href={`/delete_product/${product._id}`}>
        delete product
    </Card.Link>

        </Card.Body>
        </Card>


        </div>



    
    </>)
}

export default IndividualProducts