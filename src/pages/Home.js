import { useState ,useEffect } from "react"
import React  from 'react'
import axios from "axios";
import {MDBRow, MDBCol , MDBContainer,MDBTypography} from "mdb-react-ui-kit"
import { toast } from "react-toastify";
import Blogs from "../component/Blogs";
import Search from "../component/Search";

const Home = () => {
    const [data, setData] = useState([]);
    const [searchValue , setSearchValue] = useState("");

    useEffect(()=>{
        loadBlogsData();
    },[])

    const loadBlogsData = async ()=>{
        const response = await axios.get("http://localhost:3001/blogs");
        if(response.status ===200 ){
            setData(response.data)
        }
        else{
            toast.error("Something went wrong")
        }
    };
    console.log("data1:",data);

    const handleDelete = async (id) =>{
        if(window.confirm("Are you sure to delete the Blog?")){
            const response = await axios.delete(`http://localhost:3001/blogs/${id}`);
            if(response.status === 200 ){
                toast.success("Blog Deleted Successfully");
                loadBlogsData();
            }
            else{
                toast.error("Something went wrong")
            }
        }
    };
    const excerpt =(str) =>{
        if(str.length > 50){
            str= str.substring(0,50) + " ... "
        }
        return str;
    };
    const onInputChange = (e) =>{
        if(!e.target.value){
            loadBlogsData();
        }
        setSearchValue(e.target.value);

    };
    const handleSearch = async (e) =>{
        e.preventDefault();
        const response =await axios.get(
            `http://localhost:3001/blogs?q=${searchValue}`
            );
        if(response.status === 200){
            setData(response.data)
        }else{
            toast.error("Something Went Wrong")
        }
    };
  return (
    <>
    <Search
        searchValue={searchValue} onInputChange={onInputChange} handleSearch={handleSearch}
        >
    </Search>
    <MDBRow className="m-0 p-0">
        {data.length === 0 && (
            <MDBTypography className="text-center mb-0" tag="h2">
                No Blog Found

            </MDBTypography>
        ) }

        <MDBCol>
            <MDBContainer>
                <MDBRow className="m-0 p-0">
                    {data && data.map((item, index)=>(
                        <Blogs

                        key={index}
                        {...item}
                        excerpt={excerpt}
                        handleDelete={handleDelete}
                        />
                        

                    ))}
                </MDBRow>
            </MDBContainer>
        </MDBCol>

    </MDBRow>
    </>
  )
}

export default Home