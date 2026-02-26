import React from 'react';
import { Navbar,Container } from 'react-bootstrap';
import {ReactComponent as Logo} from '../images/logo.svg';
//Header Component for rendering the 
// navigation bar of the application 
// with the logo and title.
const NavBarStyle = {
  backgroundColor: " gold",

}

const Header = ({title}) => {
  return (

    
    <Navbar style = {NavBarStyle} variant="light">
      <Container >
      <Logo alt = {title } style = {{maxWidth:"15rem", maxHeight:"3rem"}}/>
      </Container>
    </Navbar>
  );
};

export default Header;
