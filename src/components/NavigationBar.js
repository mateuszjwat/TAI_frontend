import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

function NavigationBar(props) {

    function logOut(){
        props.setUser(null);
    }

    let loginNav = <Navbar.Brand>Login</Navbar.Brand>;
    if (!props.user){
        loginNav = <Navbar.Brand>Login</Navbar.Brand>;
    } else{
        loginNav = <Navbar.Brand onClick={logOut}>LogOut</Navbar.Brand>;
    }

    return (
        <div>
        <Navbar bg="dark" variant="dark" expand="lg">
        <LinkContainer to="/">
            <Navbar.Brand>Home</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
            <Nav class ="navbar-right">
            <Form inline>
            <Nav>
             <NavBarLogged />
            </Nav>
            <LinkContainer to="/login">
                {loginNav}
            </LinkContainer>
          </Form>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div style={{height: 30}}></div>
      </div>
    );


    function NavBarLogged(){
        if(props.user){
            return(
               <Nav>
                    <LinkContainer to="/profile">
                        <Navbar.Brand>Your profile</Navbar.Brand>
                    </LinkContainer>
                    {props.user.isParent?
                    <LinkContainer to="/myChildren">
                        <Navbar.Brand>Your children</Navbar.Brand>
                    </LinkContainer>:
                    <LinkContainer to="/duties">
                        <Navbar.Brand>My duties</Navbar.Brand>
                    </LinkContainer>
                    }

                </Nav>
            );
        } else {
            return <div></div>;
        }
    }
}


export default NavigationBar;