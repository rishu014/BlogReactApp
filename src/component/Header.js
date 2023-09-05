import React, {useState} from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse
  } from 'mdb-react-ui-kit';
    const Header = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [show,setShow]=useState(false);

  return (
    <div>
        <MDBNavbar expand='lg' light style={{ backgroundColor: '#541b1b' }}>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>
              <img src="/images/logo.jpg" alt="logo" style={{height:"30px"}}></img>
          </MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarColor02'
            aria-controls='navbarColor02'
            aria-expanded='false'
            style={{color:"#fff"}}
            aria-label='Toggle navigation'
            onClick={() => setShow(!show)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse show={show} navbar>
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
              <MDBNavbarItem className='active'>
                <MDBNavbarLink aria-current='page' href='/' style={{color:"#fff"}}>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/addBlog' style={{color:"#fff"}}>Add Blog</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/about' style={{color:"#fff"}}>About</MDBNavbarLink>
              </MDBNavbarItem>
             
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  )
}

export default Header