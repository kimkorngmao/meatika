import React, { useEffect, useState } from 'react'
import './Me.css';
import { NavigationBar } from '../../components/navigation/NavigationBar'
import { useAuth } from '../../context/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as TrashIcon } from '../../icons/trash.svg';
import { ReactComponent as PenIcon } from '../../icons/pen.svg';
import axios from 'axios';

export const Me = () => {
    const { isLoggedIn, user, logout } = useAuth();
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('/articles/me')
            .then(res => {
                setArticles(res.data);
            })
            .catch(error => { })

        axios.get('/categories')
            .then(res => {
                setCategories(res.data);
            })
            .catch(error => { })
    }, [])

    const deleteArticleClick = async (id) => {
        const confirmationMessage = `Are you sure you want to delete article with ID ${id}?`;
        const isConfirmed = window.confirm(confirmationMessage);
        if (isConfirmed) {
            try {
                await axios.delete(`articles/${id}`)
                setArticles(articles => articles.filter(article => article._id !== id));
                alert(`Article with ID ${id} has been deleted.`);
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    const deleteCategoryClick = async (id) => {
        const confirmationMessage = `Are you sure you want to delete category with ID ${id}?`;
        const isConfirmed = window.confirm(confirmationMessage);
        if (isConfirmed) {
            try {
                await axios.delete(`categories/${id}`)
                setCategories(categories => categories.filter(category => category._id !== id));
                alert(`Category with ID ${id} has been deleted.`);
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    function onLogoutBtnClick() {
        logout();
        navigate("/login");
    }

    if (!isLoggedIn) {
        navigate("/login");
    }

    return (
        !user ? <></> :
        <>
            <NavigationBar title="My Profile" />
            <div style={{ margin: "10px" }}>
                <strong className='title'>Hi {user.firstName} {user.lastName}</strong>
                <p className='paragraph'>@{user.username} <span className='logout-btn' onClick={onLogoutBtnClick}>Logout</span></p>
                <div className='table-list'>{
                    articles.length > 0 ?
                        articles.map(article => (
                            <div className='row'>
                                <div className='article-title'>{article.title}</div>
                                <div className='control-btns'>
                                    <button className='update-btn' onClick={() => { navigate(`/update/${article._id}`) }}><PenIcon /></button>
                                    <button className='delete-btn' onClick={() => { deleteArticleClick(article._id) }}><TrashIcon /></button>
                                </div>
                            </div>
                        ))
                        : <>No Article yet.</>
                }
                </div>


                <div style={{ marginTop: "30px" }}><b>Categories</b></div>
                <div className='table-list'>{
                    categories.length > 0 ?
                        categories.map(category => (
                            <div className='row'>
                                <div className='categories-title'>{category.name} ({category.code})</div>
                                <div className='control-btns'>
                                    <button className='delete-btn' onClick={() => { deleteCategoryClick(category._id) }}><TrashIcon /></button>
                                </div>
                            </div>
                        ))
                        : <>No category yet.</>
                }
                </div>
            </div>
        </>
    )
}
