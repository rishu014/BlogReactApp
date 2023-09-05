import { MDBBadge } from 'mdb-react-ui-kit'
import React from 'react'

const Badge = ({children ,styleInfo}) => {
    const colorKey = {
        Fashion: "primary",
        Travel:"success",
        Politics:"danger",
        IT:"info",
        Food:"warning",
        Sports:"dark"
    }
  return (
    <h5 style={styleInfo}>
        <MDBBadge color={colorKey[children]}>{children}</MDBBadge>
    </h5>
  )
}

export default Badge