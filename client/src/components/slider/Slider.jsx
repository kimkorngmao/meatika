import React, { useEffect, useState } from 'react'
import './Slider.css'
import { ReactComponent as LeftIcon } from '../../icons/left.svg';
import { ReactComponent as RightIcon } from '../../icons/right.svg';
import axios from 'axios';
import { Link } from 'react-router-dom'

export const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [articles, setArticles] = useState([]);

  useEffect(()=>{
    axios.get('/articles/trending')
    .then(res=>{
      setArticles(res.data);
    })
    .catch(error=>{})
  },[])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === articles.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, articles.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === articles.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? articles.length - 1 : prevIndex - 1
    );
  };

  if(articles.length <= 0) return (
    <section className="article-slide">
      <div className="skeleton-box article-image"></div>
      <div className="article-title">
        <div className="skeleton-box skeleton-line line-50"></div>
      </div>

      <div className="control-btn control-btn-prev"><LeftIcon/></div>
      <div className="control-btn control-btn-next"><RightIcon/></div>
    </section>
  );

  return (
    <section className="article-slide">
      <Link to={`/read/${articles[currentIndex]._id}`}>
      <img
        alt={articles[currentIndex].title}
        src={articles[currentIndex].image}
        className="article-image"
      />
      <div className="article-title">{articles[currentIndex].title}</div>
      </Link>

      <div className="control-btn control-btn-prev" onClick={handlePrev}><LeftIcon/></div>
      <div className="control-btn control-btn-next" onClick={handleNext}><RightIcon/></div>
    </section>
  );
}
