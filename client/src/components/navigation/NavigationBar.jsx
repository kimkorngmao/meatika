import React from 'react'
import './NavigationBar.css'
import { Link } from 'react-router-dom'
import { ReactComponent as LogoIcon } from '../../icons/logoIcon.svg'
import { ReactComponent as PlusIcon } from '../../icons/plus.svg'
import { ReactComponent as PeopleIcon } from '../../icons/people.svg'
import { useAuth } from '../../context/AuthProvider'

export const NavigationBar = ({title}) => {
    const { isLoggedIn } = useAuth();
    return (
        <header className='nav-bar-title'>
            <div className="left">
                <Link to='/'>
                    <LogoIcon/>
                </Link>
                <span>{title}</span>
            </div>
            <div className="right">
                { isLoggedIn ? <>
                    <Link to='/create'><PlusIcon width="18" height="18" />Create</Link>
                    <Link to='/me' className='me-btn'><PeopleIcon width="18" height="18" /></Link>
                </>
                :
                <Link to='/login'>Sign in</Link>
                }
                
                
            </div>
        </header>
    )
}
