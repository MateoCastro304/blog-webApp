import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const port = 3000;

function previewText(text, maxLength = 150) {
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength);
  return truncated.slice(0, truncated.lastIndexOf(" ")) + "...";
}

function Post(id, title, author, content, date, img, preview) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.content = content;
    this.date = date;
    this.img = img;
	this.preview = previewText(content);
}


const post1 = new Post(
    0,
    "Cuanto Viven las Ballenas",
    "Mateo Castro",

    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "31/01/2026",
);

const post2 = new Post(
    1,
    "Inflacion Enero 2026",
    "Dario Martinez",

    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "31/01/2026",
);
const post3 = new Post(
    2,
    "Nuevos precios de la Memoria Ram y la problematica de la IA",
    "Mateo Castro",

    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "31/01/2026",
);



var allPosts = [post1,post2,post3];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


app.post("/submit", (req,res) => {
	console.log(req.body);
	var currentDate = new Date;
	var id = allPosts.length;

	var nwPost = new Post(id, req.body["title"], req.body["author"], req.body["content"], currentDate.toDateString());
	allPosts.push(nwPost);
	console.log(nwPost);
	res.redirect("/create");

});

app.get("/", (req, res) => {
    res.render("index.ejs", { posts: allPosts });

});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/post/:id", (req, res) => {
    console.log(req.params.id);
    var post = allPosts.find((p) => p.id == req.params.id);
    console.log(post);
    res.render("view.ejs", { post: post });
});

app.get("/post/:id/edit", (req,res) => {
    var post = allPosts.find((p) => p.id == req.params.id);
    res.render("edit.ejs", { post: post });
})

app.patch("/post/:id", (req,res) => {
    var post = allPosts.find((p) => p.id == req.params.id);
    post.title = req.body["title"];
    post.content = req.body["content"];
    console.log(req.body);

    res.status(303).redirect("/post/" + req.params.id);
});
app.delete("/post/:id", (req,res) => {
    
});

app.listen(port, () => {
    console.log("Listen on Port: " + port);
});

