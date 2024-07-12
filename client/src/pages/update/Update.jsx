import React, { useEffect, useState } from 'react'
import './Update.css'
import { NavigationBar } from '../../components/navigation/NavigationBar'
import ReactTextareaAutosize from 'react-textarea-autosize'
import axios from 'axios'
import { useAuth } from '../../context/AuthProvider'
import { useNavigate, useParams } from 'react-router-dom'

export const Update = () => {
    const { articleID } = useParams();
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [selectedCate, setSelectedCate] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const { isLoggedIn } = useAuth();
    const [categories, setCategories] = useState([])
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('/categories')
        .then(res=>{
            setCategories(res.data);
        })
        .catch(error=>{})
    },[])

    useEffect(()=>{
        axios.get(`/articles/${articleID}`)
        .then(res=>{
            let data = res.data
            setTitle(data.title)
            setContent(data.content)
            setSelectedCate(data.category)
            setImageUrl(data.image)
            setError("")
        })
        .catch(error=>{
            setError(error.response.data.message)
        })
    },[articleID])

    async function onUpdateFormSubmit(e){
        e.preventDefault();
        try {
            await axios.put(`/articles/${articleID}`, {title: title, content: content, image: imageUrl, category: selectedCate})
            navigate('/me')
        } catch (error) {
            setError("error.response.data.message");
        }
    }

    if(!isLoggedIn) {
        navigate("/login");
    }
    
    return (
        <>
            <NavigationBar title={title==="" ? "Update" : title} />
            <form className='create-form' onSubmit={onUpdateFormSubmit}>
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
                    <label htmlFor="title">Category</label>
                    { categories.length > 0 &&
                    <select value={selectedCate} onChange={(event) => setSelectedCate(event.target.value)}>
                    {categories.map((category) => (
                    <option key={category._id} value={category._id} selected={category._id === selectedCate}>
                        {category.name}
                    </option>
                    ))}
                    </select>
                    }
                </div>
                <div className="form-control">
                    <label htmlFor="content">Content</label>
                    <ReactTextareaAutosize type="text" id='content' value={content} onChange={e=>{ setContent(e.target.value) }} />
                </div>
                <button>Update</button>
            </form>
        </>
    )
}
