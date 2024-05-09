const {
  getAllBlogs,
  getOneBlog,
  createBlog,
  EditBlog,
  deleteBlog,
} = require("./blogController");
const blogRoutes = require("express").Router();

blogRoutes.post("/blogs", createBlog);
blogRoutes.get("/blogs", getAllBlogs);
blogRoutes.get("/blogs/:id", getOneBlog);
blogRoutes.patch("/blogs/:id", EditBlog);
blogRoutes.delete("/blogs/:id", deleteBlog);

module.exports = { blogRoutes };
