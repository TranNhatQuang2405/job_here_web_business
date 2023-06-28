import React from 'react'
import { Spinner } from 'react-bootstrap'
import "./IconSpinner.css"
function IconSpinner({ variant }) {
    return (
        <div className="IconSpinner__box">
            <Spinner variant={variant ? variant : "danger"} animation='border' size='sm' />
        </div>
    )
}

export default IconSpinner