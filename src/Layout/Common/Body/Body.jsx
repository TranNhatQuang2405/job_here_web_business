import React from 'react'
import "./Body.css"
function Body({ children }) {
    return (
        <div className="body__layout">
            {children}
        </div>
    )
}

export default Body