import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: [true, `please provide title`],
      },
      description: {
         type: String,
         required: [true, "please provide description"],
      },
      author: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: [true, "please provide author's Id"],
      },
      body: {
         type: String,
         required: [true, "please provide post body"],
      },
      published: {
         type: Boolean,
         default: false,
      },
   },
   { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
