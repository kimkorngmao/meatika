import React from 'react'
import './ArticleCard.css'

export const ArticleCardSkeleton = () => {
    return (
        <div className="article-card">
            <div className='article-card-image mb-9 skeleton-box'></div>
            <div className='skeleton-line line-100 skeleton-box'></div>
            <div className='skeleton-line line-90 skeleton-box'></div>
            <div className='skeleton-line line-50 skeleton-box'></div>
            <div className="trending-rank">
                <span>#</span>
                <div className='skeleton-line line-30 mt-0 skeleton-box'></div>
            </div>
        </div>
    )
}
