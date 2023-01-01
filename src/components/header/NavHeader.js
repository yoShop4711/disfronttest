import { useContext, useState } from "react";
import { Navbar, Nav, Container, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { itemTotal } from "../../api/CartApi";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";



function NavHeader() {
    const state = useContext(GlobalState);
    const [isLogged] = state.userApi.isLogged;
    const [isSeller] = state.userApi.isSeller;
    const [owner] = state.userApi.owner;
    const [isAdmin] = state.userApi.isAdmin;
    const [isBuyer] = state.userApi.isBuyer;

    const logoutUser = async () => {
        localStorage.removeItem('token')
    
         
        window.location.href = "/";
    
      
      };
    
      const loggedRouter = () => {
        return (
          <Nav>
            
            <NavItem>
              <LinkContainer to="/" onClick={logoutUser}>
                <Nav.Link>logout</Nav.Link>
              </LinkContainer>
            </NavItem>
          </Nav>
        );
      };
    
      const sellerRouter = () => {
        return (
          <Nav>
            <NavItem>
              <LinkContainer to="/create_product">
                <Nav.Link>
                create product
                </Nav.Link>
                
                </LinkContainer>
            </NavItem>
            <NavItem>
              <LinkContainer to="/my_products"><Nav.Link>my products</Nav.Link></LinkContainer>
            </NavItem>
            <NavItem>
              <LinkContainer to="/customer_orders">
                
            <Nav.Link>customer orders</Nav.Link>
                
                </LinkContainer>
            </NavItem>
          </Nav>
        );
      };
    
      const adminRouter = () => {
        return (
          <Nav>
             <NavItem>
              <LinkContainer to="/show_users">
                <Nav.Link>show users</Nav.Link>
              </LinkContainer>
            </NavItem>
            <NavItem>
              <LinkContainer to="/show_sellers">
                <Nav.Link>show sellers</Nav.Link>
              </LinkContainer>
            </NavItem>
            <NavItem>
              <LinkContainer to="/filter_users">
                <Nav.Link>filter users</Nav.Link>
              </LinkContainer>
            </NavItem>
            <NavItem>
              <LinkContainer to="/create_category">
                <Nav.Link>create Category</Nav.Link>
              </LinkContainer>
            </NavItem>
            <NavItem>
              <LinkContainer to="/orders">
                <Nav.Link>orders</Nav.Link>
              </LinkContainer>
            </NavItem>
            <NavItem>
              <LinkContainer to="/customer_wishlists">

                <Nav.Link>wishlists</Nav.Link>
              </LinkContainer>
            </NavItem> 
          </Nav>
        );
      };
    
      const buyerRouter = () => {
        return (
          <Nav>
            <NavItem>
              <LinkContainer to="/buyer_orders">
                <Nav.Link>my orders</Nav.Link>
              </LinkContainer>
            </NavItem>
            <NavItem>
              <LinkContainer to="/create_wishlist">
                <Nav.Link>create wishlist</Nav.Link>
              </LinkContainer>
    
            </NavItem>
            <NavItem>
              <LinkContainer to="/my_wishlist">
                <Nav.Link>my wishlist</Nav.Link>
              </LinkContainer>
            </NavItem>
          
          </Nav>
        );
      };
    
      const figureOut = () => {
        if (isSeller) {
          return sellerRouter();
        } else if (isAdmin) {
          return adminRouter();
        } else if (isBuyer) {
          return buyerRouter();
        }
      };
    
  

    return( 
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>yoShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* <SearchBox /> */}
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>{' '}
                  <span>{itemTotal()}</span>
                  ...Cart{" "}
        
        
                </Nav.Link>
              </LinkContainer>

              
            
                  {/* <LinkContainer to="/">
                    <Nav.Item>Products </Nav.Item>
                  </LinkContainer> */}
                  {figureOut()}
        
        
        { isLogged ? (
          loggedRouter()
        ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Login ✥ Register
                  </Nav.Link>
                </LinkContainer> )}
              
              {/*
              {userInfo && userInfo.role === 'admin' && (
                <NavDropdown title="Admin" id="adminMenu">
                  <LinkContainer to={routes.USERS}>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={routes.PRODUCTS}>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={routes.ORDERS}>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )} */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

        
    </header>

    
        )
}

export default NavHeader