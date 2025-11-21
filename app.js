import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];


app.get("/", (req, res) => {
  res.render("index.ejs", { posts: posts });
});

app.get("/newpost", (req, res) => {
  res.render("create.ejs");
});

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;

  let post = null;

  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id == id) {
      post = posts[i];
      break;
    }
  }

  
  if (post == null) {
    res.send("Post not found!");
    return;
  }


  res.render("view.ejs", { post: post });
});



app.post("/newpost", (req, res) => {
   const data = {
    id: posts.length + 1,
    title: req.body["fname"],
    content: req.body["lname"]
  };
  posts.push(data);
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  
  // Find and remove the post
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id == id) {
      posts.splice(i, 1);
      break;
    }
  }
  
  res.redirect("/");
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

