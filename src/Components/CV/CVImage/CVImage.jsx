import React from 'react'
import { Avatar } from 'Components/Image'
import "./CVImage.css"
function CVImage({ cvData }) {
    return (
        <div className="CVImage__box">
            <Avatar url={cvData} width="6cm">
            </Avatar>
        </div>


    )
}

export default CVImage