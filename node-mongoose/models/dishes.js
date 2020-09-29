const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1, 
        max: 5, 
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

/*This is where schema is defined for dish*/
const dishSchema = new Schema({
    name: {
        type: String,
        /*every document will have name as a required field*/
        required: true,
        /*no 2 documents should have the same name field*/
        unique: true
    },
    description: {
        type: String, 
        required: true,
    },

    /*comment documents become sub documents of the dishes document*/
    comments: [ commentSchema ]
},{
    /*automatically adds the created at and updated at timestamps into each document that is stored in the application*/
    timestamps: true
});

var Dishes = mongoose.model("Dish", dishSchema);

module.exports = Dishes;