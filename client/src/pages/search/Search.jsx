import React, { useEffect, useState } from 'react'
import './Search.css'
import { NavigationBar } from '../../components/navigation/NavigationBar'
import { SearchBox } from '../../components/searchBox/SearchBox'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { ArticleBoxSkeleton } from '../../components/articleBox/ArticleBoxSkeleton'
import { ArticleBox } from '../../components/articleBox/ArticleBox'

export const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        if(query!==null || query!==""){
            axios.get(`/articles/search/${query}`)
            .then(res=>{
                setArticles(res.data)
            })
            .catch(error=>{

            })
            .finally(()=>{
                setIsLoading(false);
            })
        }
    },[query])

    return (
        <>
            <NavigationBar title="Search" />
            <SearchBox />
            <div style={{ margin: "0 10px"}}>{query ?
                <>
                <p className='paragraph'>Result for {query}</p>
                { isLoading ? <>
                <ArticleBoxSkeleton/>
                <ArticleBoxSkeleton/>
                <ArticleBoxSkeleton/>
                <ArticleBoxSkeleton/>
                </> :
                articles.length > 0 ? 
                articles.map(article=>(
                    <ArticleBox key={article._id} article={article} />
                )) :
                <div className='search-message'><p>No article found.</p></div>
                }
                </>
                :
                <>
                <p className='paragraph'>History</p>
                <div className='search-message'>
                    <p>No record yet.</p>
                </div>
                </>
            }</div>
        </>
    )
}
