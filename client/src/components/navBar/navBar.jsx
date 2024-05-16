import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function NavBar() {
  const navigate = useNavigate();
  // const { handleLogout } = userLogout();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("accessToken") || null;
    if (token) {
      getUserData(token);
    } else {
      setUserData(null);
    }
  }, []);

  const handleLogout = () => {
    if (localStorage.getItem("accessToken")) {
      localStorage.removeItem("accessToken");
    }

    if (localStorage.getItem("blogUserId")) {
      localStorage.removeItem("blogUserId");
    }

    setUserData(null);
  };

  const getUserData = async (token) => {
    try {
      let res = await axios.get("http://localhost:3000/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response", res);
      const data = res?.data?.userData || null;
      console.log("Data", data);
      if (data) {
        console.log("Data", data);
        setUserData(data);
      } else {
        console.log("User Data not found");
      }
    } catch (error) {
      console.error({ message: "Error on User get data", error });
    }
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {userData?.firstName ? (
          <div>
            <h5>{userData.firstName}</h5>
            <button
              onClick={() => {
                handleLogout();
                setUserData(null);
              }}
            >
              Logout{""}
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Login Page
          </button>
        )}
      </Container>
    </Navbar>
  );
}

export default NavBar;
