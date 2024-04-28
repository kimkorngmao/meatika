import React from 'react'
import './NotFound.css'
import { Link } from 'react-router-dom'

export const NotFound = () => {
    return (
        <div className='not-found-error'>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p>Page not found.</p>
                <Link to='/' className="back-home-btn">Back Home</Link>
            </div>
        </div>
    )
}
