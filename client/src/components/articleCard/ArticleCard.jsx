import React from 'react'
import './ArticleCard.css'
import { Link } from 'react-router-dom'
import moment from 'moment';

export const ArticleCard = ({article, rank}) => {
    const formattedDate = moment(article.createdAt).format('ll');

    return (
        <div className="article-card">
            <Link to={`/read/${article._id}`}>
                <div className='article-card-image mb-5' style={{backgroundImage: `url('${article.image}')`}}></div>
                <div className='article-title'>{article.title}</div>
                <div className='paragraph created-at'>{formattedDate}</div>
                <span className='paragraph trending-rank'>#{rank}</span>
            </Link>
        </div>
    )
}
