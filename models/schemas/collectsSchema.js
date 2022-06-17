const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collectsSchema = new Schema({
    user_id : {
        type: String,
        required: true
    },
    pin_id : {
        type: String,
        required: true
    },
    material_type : {
        type: String,
        required:true
    },
    quantity : {
        type: Number,
        required:true
    }
} , { timestamps : true});

const CollectsSchema = mongoose.model('Collects', collectsSchema);
module.exports = CollectsSchema;