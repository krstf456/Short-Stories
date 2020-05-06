const mongoose = require('mongoose')


//Message Schema
let StoriesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    body:{
        type:String,
        required: true
    }
})

module.exports = mongoose.model('Stories', StoriesSchema)