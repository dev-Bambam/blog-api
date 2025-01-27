import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   author: {
      type: String,
      required: true,
   },
   body: {
      type: String,
      required: true,
   },
   published: {
      type: Boolean,
      default: false
   }
});

const BlogModel = mongoose.model('blog', blogSchema)

export default  BlogModel