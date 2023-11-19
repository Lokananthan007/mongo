const mongoose = require("mongoose");

const delSchema =  new mongoose.Schema({
    empname:{type:String, required: true},
    location:{type:String, required: true},
    email: { type: String, required: true },

});


// delSchema.pre('save', function (next) {
//     next();
//   });
  
  module.exports = mongoose.model("UserDetails", delSchema);
