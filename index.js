const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// reading in the database
const posts = JSON.parse(fs.readFileSync("./Database/database.json", "utf-8"));

app.get('/', (req, res) => {
    res.status(200).send({
        message: "Welcome to my Bambam's Blog Page"
    })
})

app.get('/posts', (req, res) => {
    res.status(200).send(posts)
})

app.get("/posts/:id", (req, res) => {
  id = req.params.id;
  const post = posts.find((post) => post.id === parseInt(id));

  if (!post) {
    res.status(404).send({
      message: "NOT FOUND",
    });
  } else {
    res.status(200).send(post);
  }
});

app.post('/post', (req, res) => {
    const post = req.body;
    posts.push(post);
    const updatedPosts = JSON.stringify(posts);

    fs.writeFile('./Database/database.json', updatedPosts, (err) => {
        if (err) {
            console.error(err)
        }
    })
    // console.log(posts)
    res.status(200).send({
        message: "post added successfully"
    })
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
