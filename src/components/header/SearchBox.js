import { Form, FormControl } from 'react-bootstrap';

function SearchBox() {
    return(<>
    <Form  >
        <br />

        <Form.Group>
      <FormControl
        type="text"
        name="search"
    
        placeholder="Search product..."
        // className="mr-sm-2"
      />
      <i className="fas fa-search"></i>

      </Form.Group>
    </Form>
    
    
    </>)
}

export default SearchBox