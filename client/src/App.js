import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/home/Home';
import { Category } from './pages/categories/Category';
import { Login } from './pages/login/Login';
import { Article } from './pages/article/Article';
import { Create } from './pages/create/Create';
import { Me } from './pages/me/Me';
import { Update } from './pages/update/Update';
import { PageNotFound } from './pages/pageNotFound/PageNotFound';
import { Search } from './pages/search/Search';

function App() {
  return (
    <div className="main-container">
      <Routes>
        <Route  path='/' element={<Home/>}></Route>
        <Route  path='/login' element={<Login/>}></Route>
        <Route  path='/me' element={<Me/>}></Route>
        <Route  path='/create' element={<Create/>}></Route>
        <Route  path='/update/:articleID' element={<Update/>}></Route>
        <Route  path='/read/:articleID' element={<Article/>}></Route>
        <Route  path='/search' element={<Search/>}></Route>
        <Route  path='/t/:tag' element={<Category/>}></Route>
        <Route  path='*' element={<PageNotFound/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
