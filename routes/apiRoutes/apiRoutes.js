const router = require('express').Router();
const db = require("../../db/db.json");
const fs = require("fs");
const path = require("path");

router.get("/notes", function (req, res) {
  res.send(db).status(200);
});

router.post("/notes", function (req, res) {

  let newNote = {
    id: req.body.noteId,
    title: req.body.title,
    text: req.body.text
  };

  fs.readFile(path.join(__dirname, "../../db/db.json"), "utf8", (err, data) => {
    if (err) throw err;

    const allNotes = JSON.parse(data);

    allNotes.push(newNote);

    fs.writeFile(path.join(__dirname, "../../db/db.json"), JSON.stringify(allNotes, null, 2), err => {
      if (err) throw err;
      res.send(db);
      console.log("Note created!")
    });
  });
});

router.delete("/notes/:id", (req, res) => {

  let noteId = req.params.id;

  fs.readFile(path.join(__dirname, "../../db/db.json"), "utf8", (err, data) => {
    if (err) throw err;

    const allNotes = JSON.parse(data);
    const newAllNotes = allNotes.filter(note => note.id !== noteId);

    fs.writeFile(path.join(__dirname,"../../db/db.json"), JSON.stringify(newAllNotes, null, 2), err => {
      if (err) throw err;
      res.send(db);
      console.log("Note deleted!")
    });
  });
});

module.exports = router;

