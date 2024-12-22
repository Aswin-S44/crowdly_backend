const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/users/router");
const postRouter = require("./routes/posts/router");
const db = require("./config/db");
const http = require("http");

const cors = require("cors");

const app = express();

const port = process.env.PORT || 5000;

// Database connection
db.connect();

dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes configucations
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);

app.get("/", (req, res) => {
  res.send("Nodejs server is running....");
});

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Welcome to my simple Node.js app!");
});

// app.listen(port, () => {
//   console.log(`Server is running at the port ${port}`);
// });

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
