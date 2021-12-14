const mongoose = require("mongoose");
/* { 
    id: int
    name : tom,
    food : foo,
    age :  12,
    owner :owner2
}*/

const CatSchema = new mongoose.Schema({
  slug: string,
  name: {
    type: String,
    required: [true, "Please Enter Your Cat's Name!"],
    trim: true,
    maxlength: [30, "Max Length Is 30 Characters"],
  },
  birthDate: {
    type: date,
  },
  description: {
    type: String,
    required: [true, "Tell Us About Your Cat!!!"],
    maxlength: [200, "Max Length Is 200 Characters"],
  },
  food: {
    type: String,
    required: [true, "Tell Us About Your Cat!!!"],
    maxlength: [50, "Max Length Is 50 Characters"],
    description: {
      type: String,
      required: [true, "Tell Us About Your Cat Food!!!"],
      maxlength: [200, "Max Length Is 200 Characters"],
    },
  },

  type: {
    // Array of strings
    breed: [String],
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
    min: [1, "Let it Live Atleast A Year!"],
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
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
  },
});

module.exports = mongoose.model("Cat", CatSchema);
