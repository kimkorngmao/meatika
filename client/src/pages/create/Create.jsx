import React, { useEffect, useState } from 'react'
import './Create.css'
import { NavigationBar } from '../../components/navigation/NavigationBar'
import ReactTextareaAutosize from 'react-textarea-autosize'
import axios from 'axios'
import { useAuth } from '../../context/AuthProvider'
import { useNavigate } from 'react-router-dom'

export const Create = () => {
    const [title, setTitle] = useState("")
    const [cateName, setCateName] = useState("")
    const [content, setContent] = useState("")
    const [selectedCate, setSelectedCate] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const { isLoggedIn } = useAuth();
    const [categories, setCategories] = useState([])
    const [error, setError] = useState("");
    const [addCateSuccess, setAddCateSuccess] = useState("")
    const [addCateError, setAddCateError] = useState("")
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('/categories')
        .then(res=>{
            setCategories(res.data);
        })
        .catch(error=>{})
    },[])

    async function onCreateFormSubmit(e){
        e.preventDefault();
        try {
            await axios.post('/articles/create', {title: title, content: content, image: imageUrl, category: selectedCate})
            navigate('/me')
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    async function onCreateCategorySubmit(e){
        e.preventDefault();
        try {
            const res = await axios.post('/categories/create', {name: cateName})
            setCategories([...categories, res.data])
            setAddCateError("")
            setAddCateSuccess("Added category successfully!")
        } catch (error) {
            setAddCateSuccess("")
            setAddCateError(error.response.data.message);
        }
    }

    if(!isLoggedIn) {
        navigate("/login");
    }
    
    return (
        <>
            <NavigationBar title="Create" />
            <form className='create-form' onSubmit={onCreateFormSubmit}>
                {error && <div className="error-message">{error}</div>}
                <div className="form-control">
                    <label htmlFor="title">Title</label>
                    <input type="text" id='title' value={title} onChange={e=>{ setTitle(e.target.value) }} />
                </div>
                <div className="form-control">
                    <label htmlFor="title">Image URL</label>
                    <input type="text" id='image' value={imageUrl} onChange={e=>{ setImageUrl(e.target.value) }} />
                </div>
                <div className="form-control">
                    <label htmlFor="category">Category</label>
                    {categories.length > 0 && (
                        <select
                            value={selectedCate}
                            onChange={(event) => setSelectedCate(event.target.value)}
                            required
                        >
                            <option value="" disabled>Select a category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                <div className="form-control">
                    <label htmlFor="content">Content</label>
                    <ReactTextareaAutosize type="text" id='content' value={content} onChange={e=>{ setContent(e.target.value) }} />
                </div>
                <button>Create</button>
            </form>
            <hr />
            
            <form className='create-form' onSubmit={onCreateCategorySubmit}>
                <h4>Add new category</h4>
                {addCateSuccess && <div className="success-message">{addCateSuccess}</div>}
                {addCateError && <div className="error-message">{addCateError}</div>}
                <div className="form-control">
                    <label htmlFor="title">Name</label>
                    <input type="text" id='category-name' value={cateName} onChange={e=>{ setCateName(e.target.value) }} />
                </div>
                <button>Create</button>
            </form>
        </>
    )
}
