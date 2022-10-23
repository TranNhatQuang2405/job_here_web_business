import React from 'react'
import { Image } from 'react-bootstrap'
import image from "Assets/Images/avatar_default.png";
function Avatar(props) {
    const { width, url } = props;
    return (
        <Image
            src={url ? url : image}
            alt="Avatar"
            roundedCircle
            style={{
                width: `${width}`,
            }}
            className="mx-auto image-square"
        ></Image>
    )
}

export default Avatar