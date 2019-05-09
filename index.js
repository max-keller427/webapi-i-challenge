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
      if (user.id !== null) {
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

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err =>
      res.status(400).json({ error: "The user could not be removed" })
    );
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.update(id, changes)
    .then(user => {
      if (user.name || user.bio === null) {
        res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user." });
      } else if (user.id === null) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be modified." });
    });
});

server.listen(5000, () => console.log("running"));
