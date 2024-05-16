import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import blogIMg from "../../assets/blog.jpg";
import NavBar from "../navBar/navBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BlogView() {
  const navigate = useNavigate();
  const [allBlogs, setAllBlogs] = useState([]);
  useEffect(() => {
    getAllBlogs();
  }, []);
  const getAllBlogs = async () => {
    try {
      let res = await axios.get("http://localhost:3000/api/blogs");
      let data = res.data?.data || [];
      setAllBlogs(data);
    } catch (error) {
      console.log("Error on get all blogs", error);
    }
  };

  const redirectToBlogPage = (id) => {
    navigate(`/blogViewOne/${id}`);
  };

  return (
    <>
      <NavBar />
      <div className="row">
        {allBlogs.map((blog, index) => {
          console.log("blog", blog);
          return (
            <div className="col-md-4">
              <Card className="my-2" style={{ width: "18rem" }}>
                <Card.Img variant="top" src={blogIMg} />
                <Card.Body className="text-center">
                  <Card.Title>{blog.title}</Card.Title>
                  <Card.Text>{blog.content.substring(0, 30)}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => {
                      redirectToBlogPage(blog._id);
                    }}
                  >
                    View
                  </Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default BlogView;
