import React from 'react'
import './ArticleBox.css'
import { Link } from 'react-router-dom'
import moment from 'moment';

export const ArticleBox = ({article}) => {
  const formattedDate = moment(article.createdAt).format('ll');
  return (
    <div className='article-box'>
        <Link to={`/read/${article._id}`}>
          <div className="left" style={{ backgroundImage : `url('${article.image}')`}}></div>
          <div className="right">
              <div className='article-title title'>{article.title}</div>
              <div className='paragraph'>{formattedDate}</div>
          </div>
        </Link>
    </div>
  )
}
