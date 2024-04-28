import React, { useEffect, useState } from 'react'
import './LatestSection.css'
import { ArticleBox } from '../articleBox/ArticleBox'
import { ReactComponent as RightICon } from '../../icons/right.svg'
import { Link } from 'react-router-dom'
import { ArticleBoxSkeleton } from '../articleBox/ArticleBoxSkeleton'
import axios from 'axios'

export const LatestSection = () => {
  const [articles, setArticles] = useState([]);
  useEffect(()=>{
    axios.get('/articles')
    .then(res=>{
      setArticles(res.data);
    })
    .catch(error=>{})
  },[])

  return (
    <section id='latest-section'>
        <div className='latest-section-bar'>
            <div className="latest-title">Latest</div>
            <div>Component</div>
        </div>
        {
          articles.length > 0 ? 
          articles.map(article=>(
            <ArticleBox article={article} key={article._id} />
          )) :
          <>
          <ArticleBoxSkeleton/>
          <ArticleBoxSkeleton/>
          <ArticleBoxSkeleton/>
          </>
        }
        <div className="latest-section-footer">
            <Link to="/t/latest" className='read-more-btn'>
                More
                <RightICon/>
            </Link>
        </div>
    </section>
  )
}
