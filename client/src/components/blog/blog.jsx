import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";
import NavBar from "../navBar/navBar";

function BlogPost() {
  const [data, setData] = useState({
    title: "",
    content: "",
    author: "",
    userId: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Helo Submit");
    axios
      .post("http://localhost:3000/api/blogs", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <NavBar />
      <Form onSubmit={onSubmit} className="w-50 mx-auto mt-5">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="title"
          name="title"
          onChange={handleChange}
        />
        <br />
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="content"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          placeholder="author"
          name="author"
          onChange={handleChange}
        />
        <br />
        <Form.Label>User ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="User Id"
          name="userId"
          onChange={handleChange}
        />
        <br />
        <div className="d-flex justify-content-center">
          <Button type="submit" variant="outline-primary">
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
}

export default BlogPost;
