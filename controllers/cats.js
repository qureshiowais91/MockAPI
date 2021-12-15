//  Public
//  GET api/v1/cats
//  get all cats
const cats = require("../models/Cat");

exports.getCats = (req, res, next) => {
  res.status(200).json({ success: true, data: "Show all cats" });
};

//  Public
//  GET id: api/v1/cats
//  get a cat based on id
exports.getCat = (req, res, next) => {
  res
    .status(201)
    .json({ success: true, data: `Show cat at id ${req.params.id} ` });
};

//  Private
//  POST id: api/v1/cats
//  add new  cat to your profile

/* { 
    id: int
    name : tom,
    food : foo,
    age :  12,
    owner :owner2
}*/

exports.addCat = async (req, res, next) => {
  try {
    const cat = await cats.create(req.body);
    res.status(201).json({
      success: true,
      data: cat,
    });
  } catch {
    res.status(400).json({
      success: false,
    });
  }
};

//  private
//  put id: api/v1/cats
//  update cat's info based on ID only Owner(admin) can Update

exports.updateCat = (req, res, next) => {
  res
    .status(201)
    .json({ success: true, data: `change Name of ${req.params.id} Cat` });
};

//  private
//  delete id : api/v1/cats
//  delete cat based on ID only owner(admin) can delete

exports.deleteCat = (req, res, next) => {
  res.status(201).json({ success: true, data: `delete ${req.params.id} Cat` });
};
