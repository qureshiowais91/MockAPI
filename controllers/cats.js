//  Public
//  GET api/v1/cats
//  get all cats
const cats = require("../models/Cat");

exports.getCats = async (req, res, next) => {
  try {
    const allCats = await cats.find();

    res.status(200).json({
      success: true,
      count:allCats.length,
      data: allCats,
    });
  } catch (err) {
    res.status(400).json({
      success: true,
    });
  }
};

//  Public
//  GET id: api/v1/cats
//  get a cat based on id
exports.getCat = async (req, res, next) => {
  try {
    const cat = await cats.findById(req.params.id);

    res.status(200).json({
      success: true,
      data: cat,
    });
    if (!cat) {
      res.status(400).json({
        success: fasle,
      });
    }
  } catch (err) {
    // res.status(400).json({
    //   success: fasle,
    // });
    next(err);
  }
};

//  Private
//  POST id: api/v1/cats
//  add new  cat to your profile

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

exports.updateCat = async (req, res, next) => {
  try {
    const cat = await cats.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!cat) {
      return res.status(400).json({
        success: false,
      });
    }

    res.status(200).json({
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
//  delete id : api/v1/cats
//  delete cat based on ID only owner(admin) can delete

exports.deleteCat = async (req, res, next) => {
  try {
    const cat = await cats.findByIdAndDelete(req.params.id);

    if (!cat) {
      return res.status(400).json({
        success: false,
      });
    }
    //  return Object That is Deleted
    res.status(200).json({
      success: true,
      data: cat,
    });
  } catch {
    res.status(400).json({
      success: false,
    });
  }
};
