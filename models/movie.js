const mongoose = require('mongoose');

// Movie Schema
var MovieSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    year: {
        type: Number
    },
    director: {
        type: String
    }
});

module.exports = mongoose.model('Movie', MovieSchema);