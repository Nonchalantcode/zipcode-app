import React from 'react'

const ErrorPanel = ({ message }) => {
    return (
        <div className="error-panel">
            <h3 className="heading">
                { message }
            </h3>
        </div>
    )
}

export default ErrorPanel