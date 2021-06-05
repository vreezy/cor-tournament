// import React from 'react';

// components
import { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  // NavbarText
} from 'reactstrap';

// import {
//   Link
// } from "react-router-dom";

// styles

// util
// import useWindowSize from "../../utils/useWindowSize";

// interfaces


function NavbarComp() {
   const [isOpen, setIsOpen] = useState(false);

   const toggle = () => setIsOpen(!isOpen);

   const checkClose = () => {
     if(isOpen) {
        setIsOpen(false)
     }
   }


   return (
      <Navbar color="dark" dark fixed="top" expand="md">
        <div className="container">
        <NavbarBrand href="/">HardCoR-Season 1</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto bg-dark" navbar>
            <NavItem>
              <NavLink href="/" onClick={checkClose}>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/#/rules" onClick={checkClose}>Regeln</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/#/participants" onClick={checkClose}>Teilnehmer</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/#/teams" onClick={checkClose}>Teams</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/#/schedule" onClick={checkClose}>Spielplan</NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink href="/#/profile" onClick={checkClose}>Profile</NavLink>
            </NavItem> */}


            {/* <UncontrolledDropdown nav inNavbar dark>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Nav>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
        </div>
      </Navbar>
   );
}

export default NavbarComp;