const mongoose = require("mongoose");
const { Schema } = mongoose;

blogSchema = Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const BlogModel = mongoose.model("blog", blogSchema);
module.exports = { BlogModel };
