import React, { useEffect, useState } from 'react'
import './Category.css'
import { Header } from '../../components/header/Header'
import { ArticleBox } from '../../components/articleBox/ArticleBox'
import { ArticleBoxSkeleton } from '../../components/articleBox/ArticleBoxSkeleton'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { NotFound } from '../../components/NotFound/NotFound'

export const Category = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { tag } = useParams();

  useEffect(()=>{
    axios.get(`/articles/category?category=${tag}`)
    .then(res=>{
      setArticles(res.data);
    })
    .catch(error=>{})
    .finally(()=>{
      setIsLoading(false);
    })
  },[tag])

  return (
    <>
        <Header/>
        <div className='article-by-category'>
        {
          isLoading ?
          <>
              <ArticleBoxSkeleton />
              <ArticleBoxSkeleton />
              <ArticleBoxSkeleton />
          </> :
          articles.length > 0 ?
          <>
          <div className='tag-title'>{tag[0].toUpperCase() + tag.substring(1)}</div>
          {
            articles.map(article => (
              <ArticleBox article={article} key={article._id} />
          )) 
          }</>
          :
          <NotFound/>
        }
        </div>
    </>
  )
}
