import React from 'react'
import {MDBContainer,MDBTypography} from 'mdb-react-ui-kit'

const About = () => {
  return (
    <div style={{marginTop:"50px"}}>
        <MDBContainer>
          <MDBTypography note noteColor='primary'>
            This is a Blogging website developed For Nagaarro training purpose.
          </MDBTypography>
        </MDBContainer>
    </div>
  )
}

export default About