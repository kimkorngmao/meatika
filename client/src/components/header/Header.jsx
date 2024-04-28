import React, { useEffect, useState } from 'react'
import './Header.css'
import { ReactComponent as Logo } from '../../icons/logo.svg'
import { ReactComponent as SearchIcon } from '../../icons/search.svg'
import { ReactComponent as DownIcon } from '../../icons/down.svg'
import { Link, useParams } from 'react-router-dom'
import { ReactComponent as PlusIcon } from '../../icons/plus.svg'
import { ReactComponent as PeopleIcon } from '../../icons/peopleCircle.svg'
import { useAuth } from '../../context/AuthProvider'
import axios from 'axios'
import { SearchBox } from '../searchBox/SearchBox'

export const Header = () => {
    const [isCategoriesMenuActive, setIsCategoriesMenuActive] = useState(false);
    const [isSearchPanel, setIsSearchPanel] = useState(false);
    const { isLoggedIn } = useAuth();
    const [categories, setCategories] = useState([])

    const { tag } = useParams();

    useEffect(()=>{
        axios.get('/categories')
        .then(res=>{
            setCategories(res.data)
        })
        .catch(eror=>{})
    },[])
    
    return (
        <header id="header">
            <div className='nav-top'>
                <div className="left">
                    <Logo />
                </div>
                <div className="right">
                    <div className="right-btn" onClick={()=>{ setIsSearchPanel(!isSearchPanel) }}><SearchIcon /></div>
                    { isLoggedIn ? 
                    <>
                    <Link to='/create' className='create-btn'><PlusIcon width="18" height="18" />Create</Link>
                    <Link to='/me' className='me-btn'><PeopleIcon width="18" height="18" /></Link>
                    </>
                    :
                    <Link to='/login' className="sign-in-btn">Sign in</Link>
                    }
                    
                </div>
            </div>
            { isSearchPanel && <SearchBox/>}
            <div className={`categories-list ${isCategoriesMenuActive ? "active" : ""}`}>
                <div className="left">
                    <Link to="/" className={!tag ? "active": ""}>For You</Link>
                    <Link to="/t/latest" className={`latest-btn ${tag==="latest" ? "active": ""}`}>🔥Latest</Link>
                    { categories.length > 0 &&
                    categories.map(category => (
                        <Link to={`/t/${category.code}`} className={tag === category.code ? "active" : ""} key={category._id}>{category.name}</Link>
                    ))
                    }
                </div>
                <div className="right" onClick={()=>{ setIsCategoriesMenuActive(!isCategoriesMenuActive) }}>
                    <DownIcon/>
                </div>
            </div>
        </header>
    )
}
