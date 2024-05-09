const { BlogModel } = require("./blogModel");
const mongoose = require("mongoose");

const createBlog = async (req, res) => {
  try {
    console.log("hii 1");
    const { title, content, author, createdAt, userId } = req.body;
    if (!title || !content || !author || !userId) {
      return res.status(404).json({ message: "All fields Required" });
    }
    console.log("hii 2");
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Id is not Valid" });
    }
    console.log("hii 3");
    const newBlog = new BlogModel({
      title,
      content,
      author,
      createdAt,
      userId,
    });
    await newBlog.save();
    console.log("hii 5");
    return res.status(200).json({ message: "New Blog Added", data: newBlog });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await BlogModel.find().populate("userId").exec();
    if (allBlogs.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    return res.status(200).json({ message: "All Data found", data: allBlogs });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOneBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "Id Required" });
    }

    const blog = await BlogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: `No blog with Id ${id}` });
    }
    return res
      .status(200)
      .json({ message: `Found blog with id ${id} `, Data: blog });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const EditBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    if (!id) {
      return res.status(404).json({ message: "Id Required" });
    }

    const blog = await BlogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: `No blog with Id ${id}` });
    }
    const editedBlog = await BlogModel.findByIdAndUpdate(
      id,
      { content: content },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: `Updated blog with id ${id} `, Data: editedBlog });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    console.log("Hii Delete");
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "Id Required" });
    }
    console.log(id, "id");
    const blog = await BlogModel.findById(id);
    console.log("blog", blog);
    if (!blog) {
      return res.status(404).json({ message: `No blog with Id ${id}` });
    }
    const dBlog = await BlogModel.findByIdAndDelete(id);
    console.log(dBlog);
    return res
      .status(200)
      .json({ message: `Deleted blog with id ${id} `, Data: dBlog });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBlogs,
  getOneBlog,
  createBlog,
  EditBlog,
  deleteBlog,
};
