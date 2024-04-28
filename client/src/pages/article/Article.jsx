import React, { useEffect, useState } from 'react'
import './Article.css'
import { NavigationBar } from '../../components/navigation/NavigationBar'
import { NotFound } from '../../components/NotFound/NotFound'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Markdown from 'react-markdown'
import moment from 'moment'

export const Article = () => {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { articleID } = useParams();

  useEffect(() => {
    axios.get(`/articles/${articleID}`)
      .then(res => {
        setArticle(res.data);
      })
      .catch(error => {
        console.log(error)
      })
      .finally(()=>{
        setIsLoading(false);
      })
  }, [articleID])

  return (
    isLoading ? <>
    <center style={{ paddingTop : "20px"}}>Loading...</center>
    </> :
    article ? <>
      <NavigationBar title={article.title} />
      <div className="article">
        <h3>{article.title}</h3>
        <span className='paragraph'>Created: {moment(article.createdAt).format('ll')}</span>
        <img className="article-cover-image" src={article.image} alt={article.title} />
        <Markdown>{article.content}</Markdown>
      </div>
    </> :
    <NotFound/>
  )
}
