import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import axios from "axios";
import React, { useEffect, useState } from "react";

export function MyNavbar() {
  const navigate = useNavigate();
  const { handleLogout } = useLogout();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("power-token") || null;
    if (token) {
      getUserData(token);
    } else {
      setUserData(null);
    }
  }, []);

  const getUserData = async (token) => {
    try {
      let res = await axios.get("http://localhost:3443/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res?.data?.userData || null;
      if (data) {
        console.log("Data", data);
        setUserData(data);
      } else {
        console.log("User data not found");
      }
    } catch (error) {
      console.error("Error on get user data", error);
    }
  };
  return (
    <>
      <div>Navbar</div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {userData?.username ? (
            <div>
              <h5> {userData.username} </h5>
              <button
                onClick={() => {
                  handleLogout();
                  setUserData(null);
                }}
              >
                Logout{" "}
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
    </>
  );
}
