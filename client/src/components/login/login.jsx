import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const [data, setData] = useState({
    email: "123@gmail.com",
    password: "12345",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(e);
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      alert("All field required");
    }
    console.log("hi", data);
    axios
      .post("http://localhost:3000/user/login", data)
      .then((res) => {
        if (res.status === 200) {
          console.log("Success Response", res);
          const userId = res.data.data;
          localStorage.setItem("blogUserId", userId);
          const token = res.data.Token;
          localStorage.setItem("accessToken", token);
          alert("Login Successful");
          setTimeout(() => {
            navigate("/home");
          }, 1000);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert(err.response.data.message);
        }
      });
  };

  return (
    <Card className="mx-auto mt-5 w-75 text-bg-primary">
      <Card.Body>
        <div className="w-50 mx-auto mt-5 text-bg-light">
          <Form onSubmit={onSubmit}>
            <h4 className="text-center">Login</h4>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
              <br />
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={handleChange}
              />
              <br />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button type="submit" variant="outline-primary">
                Login
              </Button>
            </div>
            <div className="mt-3 text-center">
              <p>Forgot Username/Password?</p>
              <p>Don't have an account? Sign Up</p>
            </div>
          </Form>
        </div>
      </Card.Body>
    </Card>
  );
}

export default UserLogin;
