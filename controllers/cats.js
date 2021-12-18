//  Public
//  GET api/v1/cats
//  get all cats
const cats = require("../models/Cat");
const ErrorResponse = require("../utils/errorResponse");
const asynHandler = require("../middleware/async");
const asyncHandler = require("../middleware/async");

exports.getCats = asynHandler(async (req, res, next) => {
  const allCats = await cats.find();

  res.status(200).json({
    success: true,
    count: allCats.length,
    data: allCats,
  });

  // res.status(400).json({
  //   success: true,
  // });
});

//  Public
//  GET id: api/v1/cats
//  get a cat based on id
exports.getCat = asynHandler(async (req, res, next) => {
  const cat = await cats.findById(req.params.id);

  if (!cat) {
    return next(new ErrorResponse("Cat not Found", 404));
  }

  res.status(200).json({
    success: true,
    data: cat,
  });
});

//  Private
//  POST id: api/v1/cats
//  add new  cat to your profile

exports.addCat = asynHandler(async (req, res, next) => {
  const cat = await cats.create(req.body);

  res.status(201).json({
    success: true,
    data: cat,
  });
});

//  private
//  put id: api/v1/cats
//  update cat's info based on ID only Owner(admin) can Update

exports.updateCat = asyncHandler(async (req, res, next) => {
  const cat = await cats.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!cat) {
    return next(new ErrorResponse("Cat not Found", 404));
  }

  res.status(200).json({
    success: true,
    data: cat,
  });
});

//  private
//  delete id : api/v1/cats
//  delete cat based on ID only owner(admin) can delete

exports.deleteCat = async (req, res, next) => {
  try {
    const cat = await cats.findByIdAndDelete(req.params.id);

    if (!cat) {
      return next(new ErrorResponse("Cat not Found", 404));
    }
    //  return Object That is Deleted
    res.status(200).json({
      success: true,
      data: cat,
    });
  } catch (err) {
    next(err); // res.status(400).json({
    //   success: false,
    // });
  }
};
