// implement your API here

const express = require("express");

const server = express();

const db = require("./data/db.js");

server.use(express.json());

server.post("/api/users", (req, res) => {
  const newPost = req.body;
  //   console.log(newPost);

  db.insert(req.body)
    .then(user => {
      //   console.log(user);
      if (user.name || user.bio !== null) {
        res.status(201).json(user);
      } else {
        res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user." });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      });
    });
});

server.get("/api/users", (req, res) => {
  db.find(req.body)
    .then(body => {
      res.status(500).json(body);
    })
    .catch(err =>
      res.json({ error: "The users information could not be retrieved." })
    );
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      console.log(user);
      if (id) {
        res.json(user);
      } else {
        res
          .status(500)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error =>
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." })
    );
});

server.listen(5000, () => console.log("running"));
