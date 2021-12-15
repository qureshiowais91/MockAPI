const express = require("express");

const {
  getCats,
  getCat,
  addCat,
  deleteCat,
  updateCat,
} = require("../controllers/cats");

const rounter = express.Router();

rounter.route("/").get(getCats).post(addCat);
rounter.route("/:id").get(getCat).delete(deleteCat).put(updateCat);

module.exports = rounter;
