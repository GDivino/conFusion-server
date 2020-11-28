var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");


var User = new Schema({
    /*we do not need this anymore because these will automatically added in by the passport local mongoose
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    */
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    }
});

//automatically adds in support for username and hash storage of the passport
User.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", User);