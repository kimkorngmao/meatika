import React from 'react'
import './ArticleBox.css'
import { Link } from 'react-router-dom'

export const ArticleBoxSkeleton = () => {
  return (
    <div className='article-box'>
        <Link>
        <div className="left skeleton-box"></div>
        <div className="right">
            <div className='skeleton-line line-100 skeleton-box'></div>
            <div className='skeleton-line line-90 skeleton-box'></div>
            <div className='skeleton-line line-30 skeleton-box'></div>
        </div>
        </Link>
    </div>
  )
}
