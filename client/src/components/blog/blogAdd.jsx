import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../navBar/navBar";

function BlogAdd() {
  const [data, setData] = useState({
    userId: "",
    title: "",
    content: "",
    author: "",
  });

  useEffect(() => {
    const id = localStorage.getItem("blogUserId") || null;
    if (id) {
      setData({ ...data, userId: id });
    }
  }, []);
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(data, "data");
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("data", data);
    axios
      .post("http://localhost:3000/api/blogs", data)
      .then((res) => {
        if (res.status === 200) {
          alert("Blog Added Successfully");
          setTimeout(() => {
            navigate("/blogView");
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <NavBar />
      <div className="w-50 mx-auto mt-5 text-bg-light">
        <h4 className="text-center">Add Blog</h4>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              name="title"
              onChange={handleChange}
            />
          </Form.Group>

          <FloatingLabel controlId="floatingTextarea2" label="Content">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              name="content"
              onChange={handleChange}
            />
          </FloatingLabel>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text-area"
              placeholder="Author"
              name="author"
              onChange={handleChange}
            />
          </Form.Group>

          <div className="text-center">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default BlogAdd;
