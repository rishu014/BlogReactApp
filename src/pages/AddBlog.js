import React, { useEffect, useState } from "react";
import { MDBValidation, MDBInput, MDBBtn, MDBTextArea } from "mdb-react-ui-kit";
import { useNavigate , useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// d798o1v1

const initialState = {
  title: "",
  category: "",
  content: "",
  imageUrl: "",
};

const options = ["Food", "Travel", "IT", "Fashion", "Sports", "Politics"];

const AddBlog = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [categoryErrMsg,setCategoryErrMsg ]=useState(null);
  const [editMode,setEditMode ]=useState(false);
  const { title, category, content, imageUrl } = formValue;

  const navigate = useNavigate();

  const {id}= useParams();

  useEffect(()=>{
    if(id){
      setEditMode(true);
      getSingleBlog(id);

    }
    else{
      setEditMode(false)
      setFormValue({...initialState});
    }
  },[id]);

  const getSingleBlog =async (id) =>{
    const singleBlog = await axios.get(`http://localhost:3001/blogs/${id}`)
    if(singleBlog.status === 200){
      setFormValue({ ...singleBlog.data });
    }
    else{
      toast.error("Something went Wrong")
    }
    
  }
  const getDate = () =>{
      let today = new Date();
      let dd =String(today.getDate()).padStart(2,"0");
      let mm =String(today.getMonth()+1).padStart(2,"0");
      //0 jan
      let yyyy =today.getFullYear();
      return today; 
  }

  const submitForm = async (e) => {
      e.preventDefault();
      if(!category){
          setCategoryErrMsg("Please select a category");
      }
      
      const imageValidation=!editMode ? imageUrl:true;

      if(title && content && imageUrl && category){
          const currentDate =getDate();
          if(!editMode){
            const updatedBlogData= {...formValue,date:currentDate}
            const response = await axios.post("http://localhost:3001/blogs",updatedBlogData)
            if(response.status === 201){
                toast.success("Blog created sucessfully")
            }
            else{
                toast.error("something went wrong")
            }
          }
          else{
            const response = await axios.put(`http://localhost:3001/blogs/${id}`,formValue)
            if(response.status === 200){
                toast.success("Blog updated sucessfully")
            }
            else{
                toast.error("something went wrong")
            }
          }

         
         
          setFormValue({title:"",content:"",category:"",imageUrl:""})
          navigate("/");
      }

  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onUploadImage = (file) => {
    console.log("file", file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "d798o1v1");
    axios
      .post("http://api.cloudinary.com/v1_1/dx2md49fg/image/upload", formData)
      .then((resp) => {
        toast.info("Image Uploaded Successfully");
        setFormValue({ ...formValue, imageUrl: resp.data.url });
        console.log(resp.data.url);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
    // CLOUDINARY_URL=cloudinary://671232492999662:ZNUaHiTUdjayM-CxNZXxrei8-u8@dx2md49fg
  };

  const onCategoryChange = (e) => {
    setCategoryErrMsg(null);
    setFormValue({ ...formValue, category: e.target.value });
  };

  return (
    <MDBValidation
      className="row g-3"
      style={{ marginTop: "100px" }}
      noValidate
      onSubmit={submitForm}
    >
      <p className="fs-2 fw-blod text-center">{editMode ? "Update Blog" : "Add Blog"}</p>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <MDBInput
          value={title || ""}
          name="title"
          type="text"
          onChange={onInputChange}
          required
          label="Title"
          validation="please provide a title"
          
          style={{marginBottom:"10px"}}
        ></MDBInput>

        <MDBTextArea
        className="my-2"
          value={content || ""}
          name="content"
          type="text"
          onChange={onInputChange}
          required
          label="Content"
          validation="please provide a Content"
          textarea="true"
          rows={4}
          ></MDBTextArea>

        {!editMode && (
          <input
          type="file"
          className="form-control my-2"
          onChange={(e) => onUploadImage(e.target.files[0])}
          required
          validation="please provide a title"
          
        ></input>
        )}
        

        <select
          className="form-select my-2"
          onChange={onCategoryChange}
          value={category}
          
        >
          <option>please select category</option>
          {options.map((opt, index) => (
            <option value={opt || ""} key={index}>
              {" "}
              {opt}
            </option>
          ))}
        </select>
        {
            categoryErrMsg && (
            <div className="categoryErrMsg">{categoryErrMsg}</div> 
            )
        }
        <br />

        <MDBBtn type="submit" style={{ marginRight: "10px" ,marginLeft:"100px"}}>
          {editMode ? "Update" :"Add"}
        </MDBBtn>
        <MDBBtn color="danger" style={{ marginRight: "10px" }} onClick={"/"}>
          {" "}
          Cancel{" "}
        </MDBBtn>
      </div>
    </MDBValidation>
  );
};

export default AddBlog;
