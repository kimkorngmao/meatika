import React, { useEffect, useState } from 'react'
import './TrendingSection.css'
import { ReactComponent as FireIcon } from '../../icons/fire.svg'
import { ArticleCard } from '../articleCard/ArticleCard'
import { ArticleCardSkeleton } from '../articleCard/ArticleCardSkeleton'
import axios from 'axios'

export const TrendingSection = () => {
  const [articles, setArticles] = useState([]);
  useEffect(()=>{
    axios.get('/articles/trending')
    .then(res=>{
      setArticles(res.data);
    })
    .catch(error=>{})
  },[])
  return (
    <section id='tending-section'>
        <div className='tending-section-bar'>
            <FireIcon color='#ff334b'/>
            <div>Tending</div>
        </div>
        <div className='trending-list'>
        {
          articles.length > 0 ? 
          articles.map((article, index)=>(
            <ArticleCard article={article} rank={index+1} key={article._id} />
          )) :
          <>
          <ArticleCardSkeleton/>
          <ArticleCardSkeleton/>
          <ArticleCardSkeleton/>
          </>
        }
        </div>
    </section>
  )
}
