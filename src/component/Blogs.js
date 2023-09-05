import React, { useState } from "react";
import {
  MDBCol,
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import Badge from "../pages/Badge";
import "../App.css";

const Blogs = (props) => {
  const { title, category, content, id, imageUrl, excerpt, handleDelete } =
    props;
  const [isLiked, setIsLiked] = useState(false);
  const toggleLike = () => setIsLiked(!isLiked);

  return (
    <>
      <MDBCol size="4" className="my-3">
        <MDBCard className="h-100 mt-2" style={{ maxWidth: "22rem" }}>
          <MDBCardImage
            src={imageUrl}
            alt={title}
            position="top"
            className="imgSet"
          />

          <MDBCardBody>
            <MDBCardTitle>{title}</MDBCardTitle>
            <MDBCardText>
              {excerpt(content)}
              <Link to={`/blog/${id}`}>Read More</Link>
            </MDBCardText>
            <Badge>{category}</Badge>
            <div className="d-flex">
              <span>
                <MDBBtn
                  className="mt-1"
                  tag="a"
                  color="none"
                  onClick={() => {
                    handleDelete(id);
                  }}
                >
                  <MDBIcon
                    fas
                    icon="trash"
                    style={{ color: "#dd4b39" }}
                    size="lg"
                  />
                </MDBBtn>
                <Link to={`editBlog/${id}`}>
                  <MDBIcon
                    fas
                    icon="edit"
                    style={{ color: "#55acee", marginLeft: "10px" }}
                    size="lg"
                  />
                </Link>
              </span>
              <span className="ms-auto text-danger fs-5" onClick={toggleLike}>
                <i className={isLiked ? "fas fa-heart " : "far fa-heart "} />
              </span>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </>
  );
};

export default Blogs;
