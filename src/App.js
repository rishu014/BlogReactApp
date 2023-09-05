import './App.css';
import {Routes,BrowserRouter,Route} from "react-router-dom"
import Home from './pages/Home';
import AddBlog from './pages/AddBlog';
import Blog from './pages/Blog';
import About from './pages/About';
import NotFound from './pages/NotFound';
import {ToastContainer} from "react-toastify";
import {} from "react-toastify/dist/ReactToastify.css";
import Header from './component/Header';

function App() {
  return (
   <BrowserRouter>
   <div className='App'>
     <Header>

     </Header>
     <ToastContainer>

     </ToastContainer>

     <Routes>
       <Route path='/' element={<Home />}></Route>
       <Route path='/addBlog' element={<AddBlog />}></Route>
       <Route path='/editBlog/:id' element={<AddBlog />}></Route>
       <Route path='/blog/:id' element={<Blog />}></Route>
       <Route path='/about' element={<About />}></Route>
       <Route path='*' element={<NotFound />}></Route>
     </Routes>
   </div>
   </BrowserRouter>
  );
}

export default App;
