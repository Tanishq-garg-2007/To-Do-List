const mongoose = require('mongoose');

const {Schema} = mongoose;

const ListSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },

    list_data:{
        type: Array,
        required: true,
    }
})

module.exports = mongoose.model('list',ListSchema);