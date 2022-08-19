const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    meta: {type: String},
    title: {type: String},
    content: {type: String},
    picture: {type: String},
    like: {type: Number, defaut: 0}
})

module.exports = mongoose.model('article', articleSchema);