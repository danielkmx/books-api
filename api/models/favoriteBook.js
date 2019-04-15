const mongoose = require('mongoose');

const favoriteBookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    bookId: { type: String, required: true},
});
module.exports = mongoose.model('FavoriteBook', favoriteBookSchema);