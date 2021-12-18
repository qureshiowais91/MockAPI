const mongoose = require("mongoose");
const slugify = require("slugify");
const geoCoder = require("../utils/geoCoder");

const CatSchema = new mongoose.Schema({
  slug: String,
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  name: {
    type: String,
    required: [true, "Please Enter Your Cat's Name!"],
    trim: true,
    maxlength: [30, "Max Length Is 30 Characters"],
  },
  birthDate: {
    type: Date,
  },
  description: {
    type: String,
    required: [true, "Tell Us About Your Cat!!!"],
    maxlength: [200, "Max Length Is 200 Characters"],
  },
  food: {
    type: String,
    required: [true, "Cat's Food!"],
    maxlength: [50, "Max Length Is 50 Characters"],
    description: {
      type: String,
      required: [true, "Tell Us About Your Cat Food!!!"],
      maxlength: [200, "Max Length Is 200 Characters"],
    },
  },

  breed: {
    // Array of strings
    type: [String],
    required: true,
    enum: [
      "Abyssinian",
      "American Wirehair",
      "Bombay",
      "Bengal",
      "Burmese",
      "Chartreux",
      "Other",
    ],
  },

  lifeExpectency: {
    type: Number,
    min: [1, "Atleast A Year!"],
    max: [50, "Really"],
  },
  avgCost: Number,
  owner: {
    name: {
      type: String,
      maxlength: [30, "Max Length Is 30 Characters"],
    },
    phone: {
      type: String,
      maxlength: [20, "Phone number can not be longer than 20 characters"],
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },

    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    location: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
      city: String,
      zipcode: String,
      country: String,
    },
  },
});

CatSchema.pre("save", function (next) {
  console.log("slugify Run");
  console.log(this.name);
  this.slug = slugify(this.name, { lower: true });
  console.log(this.slug);
  next();
});

CatSchema.pre("save", async function (next) {
  const loc = await geoCoder.geocode(this.owner.address);

  this.owner.location = {
    type: "Point",
    formattedAddress: loc[0].formattedAddress,
    city: loc[0].city,
    zipcode: loc[0].zipcode,
    country: loc[0].country,
    coordinates: [loc[0].longitude, loc[0].latitude],
  };
  this.owner.address = undefined;
  next();
});

module.exports = mongoose.model("Cat", CatSchema);
