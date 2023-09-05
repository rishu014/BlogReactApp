import React,{useState,useEffect} from 'react'
import {
  MDBIcon,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardText,
  MDBCardTitle,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBCard,
} from "mdb-react-ui-kit"

import{useParams,Link} from "react-router-dom"
import axios from 'axios'
import Badge from './Badge'
import { toast } from 'react-toastify'

const Blog = () => {
  const [blog, setBlog]=useState();
  const [relatedBlog, setRelatedBlog]= useState([]);
  const {id}=useParams();

  useEffect(()=>{
    if(id){
      getSingleBlog();
    }
  },[id])

  const getSingleBlog = async()=>{
    const response = await axios.get(`http://localhost:3001/blogs/${id}`);
    const relatedBlogData =await axios.get(`http://localhost:3001/blogs?category=${response.data.category}&_start=0&_end=3`) 
    

    if(response.status === 200 || relatedBlogData.status ===200 ){
      setBlog(response.data);
      setRelatedBlog(relatedBlogData.data);
    }
    else{
      toast.error("Something went wrong")
    }
    
  }

  const styleInfo = {
    display: "inline",
    marginLeft:"5px",
    float:"right",
    marginTop:"7px"
  }

  const excerpt =(str) =>{
    if(str.length > 60){
        str= str.substring(0,60) + " ... "
    }
    return str;
};


  return (
    <MDBContainer style={{border:"1px solid #d1ebe8"}}>
      <Link to="/">
        <strong style={{float:"left",color:"black"}} className='mt-3'>Go Back </strong>
      </Link>
      <MDBTypography tag="h2" className='text-muted mt-2 ' style={{display: "inline-block", marginLeft:"400px"}}>
        {blog && blog.title}
      </MDBTypography>
      <img src={blog && blog.imageUrl} 
      className="img-fluid rounded" 
      alt={blog && blog.title} 
      style={{width:"100%" , maxHeight:"450px"}}
      />
      <div style={{marginTop:"20px"}}>
        <div style={{height:"43px", background:"#f6f6f6"}}>
          <MDBIcon 
          style={{float:"left"}}
          className="mt-3"
          far
          icon="calendar-alt"
          size='lg'
          >
          </MDBIcon>
          <strong style={{float:"left",marginTop:"12px",marginLeft:"2px"}}>
            {blog && blog.date.slice(0,10)}
          </strong>
          <Badge styleInfo={styleInfo}>{blog && blog.category}</Badge>

        </div>
        <MDBTypography className='lead md-0'>
          {blog && blog.content}

        </MDBTypography>
      </div>
    {relatedBlog && relatedBlog.length > 0 &&(
      
      <>
      {relatedBlog.length >1 &&(
        <h1>Related Blogs</h1>
      )}
      <MDBRow className='row-col-1 row-cols-md-3 m-0 p-0 g-4'>
          {relatedBlog.filter((item)=>item.id != id).map((item,index)=>(
            <MDBCol>
              <MDBCard>
                <Link to={`/blog/${item.id}`}>
                  <MDBCardImage src={item.imageUrl} alt={item.title} position="top" width="100%" height="100%"> 
                  </MDBCardImage>
                </Link>
                <MDBCardBody>
                  <MDBCardTitle>{item.title}</MDBCardTitle>
                  <MDBCardText>{excerpt(item.content)}</MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
      </MDBRow>
      </>
    )}
    </MDBContainer>
  )
}

export default Blog