import React from 'react'
import { Image } from 'react-bootstrap'
import image from "Assets/Images/avatar_default.png";
import "./Avatar.css"
function Avatar(props) {
    const { width, url, className } = props;
    return (
        <div className={`image-square ${className || ''}`} style={{ width: `${width}`, }}>
            <Image
                src={url ? url : image}
                alt="Avatar"
                roundedCircle
                style={{
                    width: `${width}`,
                }}
            ></Image>
        </div>
    )
}

export default Avatar