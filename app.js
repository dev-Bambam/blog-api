const http = require("http");

// Sample data to simulate a database
let blogPosts = [
   { id: 1, title: "First Post", content: "This is the content of the first post." },
   { id: 2, title: "Second Post", content: "This is the content of the second post." },
];

// Create an HTTP server
const server = http.createServer((req, res) => {
   // Parse the URL and method
   const urlParts = req.url.split("/");
   const method = req.method;

   switch (method) {
      case "GET":
         if (urlParts[1] === "posts") {
            // Handle GET request for all posts
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(blogPosts));
         } else if (urlParts[1] === "posts" && urlParts[2]) {
            // Handle GET request for a specific post by ID
            const postId = parseInt(urlParts[2]);
            const post = blogPosts.find((p) => p.id === postId);
            if (post) {
               res.writeHead(200, { "Content-Type": "application/json" });
               res.end(JSON.stringify(post));
            } else {
               res.writeHead(404, { "Content-Type": "text/plain" });
               res.end("Post not found");
            }
         } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Not found");
         }
         break;

      case "POST":
         if (urlParts[1] === "posts") {
            let body = "";
            req.on("data", (chunk) => {
               body += chunk.toString(); // Convert Buffer to string
            });
            req.on("end", () => {
               const newPost = JSON.parse(body);
               newPost.id = blogPosts.length + 1; // Assign a new ID
               blogPosts.push(newPost);
               res.writeHead(201, { "Content-Type": "application/json" });
               res.end(JSON.stringify(newPost));
            });
         } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Not found");
         }
         break;

      case "PUT":
         if (urlParts[1] === "posts" && urlParts[2]) {
            const postId = parseInt(urlParts[2]);
            let body = "";
            req.on("data", (chunk) => {
               body += chunk.toString();
            });
            req.on("end", () => {
               const updatedData = JSON.parse(body);
               const index = blogPosts.findIndex((p) => p.id === postId);
               if (index !== -1) {
                  blogPosts[index] = { ...blogPosts[index], ...updatedData };
                  res.writeHead(200, { "Content-Type": "application/json" });
                  res.end(JSON.stringify(blogPosts[index]));
               } else {
                  res.writeHead(404, { "Content-Type": "text/plain" });
                  res.end("Post not found");
               }
            });
         } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Not found");
         }
         break;

      case "DELETE":
         if (urlParts[1] === "posts" && urlParts[2]) {
            const postId = parseInt(urlParts[2]);
            const index = blogPosts.findIndex((p) => p.id === postId);
            if (index !== -1) {
               blogPosts.splice(index, 1); // Remove the post
               res.writeHead(204); // No content response for successful deletion
               res.end();
            } else {
               res.writeHead(404, { "Content-Type": "text/plain" });
               res.end("Post not found");
            }
         } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Not found");
         }
         break;

      default:
         res.writeHead(405, { "Content-Type": "text/plain" });
         res.end("Method Not Allowed");
   }
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
