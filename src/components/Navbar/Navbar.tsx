import React from 'react';

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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

import {
  Link
} from "react-router-dom";

// styles
//import './Header.scss';

// util
import useWindowSize from "../../utils/useWindowSize";

// interfaces


function NavbarComp() {
   const [isOpen, setIsOpen] = useState(false);

   const toggle = () => setIsOpen(!isOpen);


   return (
      <Navbar color="dark" dark fixed="top" expand="md">
        <div className="container">
        <NavbarBrand href="/">HardCoR-Cup</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto bg-dark" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/#/rules">Regeln</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/#/participants">Teilnehmer</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/#/teams">Teams</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/#/schedule">Turnierplan</NavLink>
            </NavItem>
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