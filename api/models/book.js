const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Name: { type: String, required: true},
    ImgURL: { type: String, required: true},
    Description: { type: String , required: true},
    RatingDetails: { type: Number , required: true},
    PageCount: { type: Number , required: true},
    Rating: { type: String , required: true},
    RegisteDate: {type: String},
    Author: {type: String, required: true}
});


module.exports = mongoose.model('Book', bookSchema);