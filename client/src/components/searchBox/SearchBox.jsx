import React, { useEffect, useState } from 'react'
import './SearchBox.css'
import { ReactComponent as SearchIcon } from '../../icons/search.svg'
import { useNavigate, useSearchParams } from 'react-router-dom';

export const SearchBox = () => {
    const [searchParams] = useSearchParams();
    const [queryStr, setQueryStr] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        setQueryStr(searchParams.get('query'))
    },[searchParams])
    function onSearchSubmit(e){
        e.preventDefault();
        if(queryStr===null || queryStr===""){
            return
        }
        navigate(`/search?query=${queryStr}`);
    }
    return (
        <form className='search-box' onSubmit={onSearchSubmit}>
            <button className={queryStr==="" || queryStr===null ? "" : "active"}><SearchIcon width="18" height="18"/></button>
            <input type="text" value={queryStr} onChange={e=> { setQueryStr(e.target.value) }} placeholder="What you're looking for..." />
        </form>
    )
}
