const mongoose = require('mongoose');

const portfolioSchema = mongoose.Schema({
    meta: {type: String},
    title: {type: String},
    content: {type: String},
    image: {type: String},
    picture: {type: String},
    stars: {type: Number, defaut: 0},
    usersVotes: {type: [String]}
})

module.exports = mongoose.model('portfolio', portfolioSchema);