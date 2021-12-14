const express = require("express");
const rounter = express.Router();

rounter.get("/", (req, res) => {
  res.status(200).json({ success: true, data: "Show all cats" });
});

rounter.get("/:id", (req, res) => {
  res.status(201).json({ success: true, data: `Show cat at id ${req.params.id} ` });
});

rounter.post("/", (req, res) => {
  res.status(201).json({ success: true, data: "add new Cat" });
});

rounter.put("/:id", (req, res) => {
  res
    .status(201)
    .json({ success: true, data: `change Name of ${req.params.id} Cat` });
});

rounter.delete("/:id", (req, res) => {
  res.status(201).json({ success: true, data: `delete ${req.params.id} Cat` });
});

module.exports = rounter;
