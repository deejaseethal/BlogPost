import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserSignUp from "./components/signUp/signUp.jsx";
import UserLogin from "./components/login/login.jsx";
import BlogPost from "./components/blog/blog.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/home.jsx";
import BlogView from "./components/blog/blogView.jsx";
import BlogAdd from "./components/blog/blogAdd.jsx";
import NavBar from "./components/navBar/navBar.jsx";
import SingleBlog from "./components/blog/blogSingleView.jsx";
import ViewAllUsers from "./components/admin/viewAllUsers.jsx";
import ViewSingleUser from "./components/admin/viewSingleUser.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signUp" element={<UserSignUp />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/blog" element={<BlogPost />} />
        <Route path="/home" element={<Home />} />
        <Route path="/blogView" element={<BlogView />} />
        <Route path="/blogAdd" element={<BlogAdd />} />
        <Route path="/navBar" element={<NavBar />} />
        <Route path="/blogViewOne/:id" element={<SingleBlog />} />
        <Route path="/viewAllUsers" element={<ViewAllUsers />} />
        <Route path="/viewSingleUser/:id" element={<ViewSingleUser />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
