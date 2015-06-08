/**
 * Created by xiefuheng on 15/6/5.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: String,
    desc: String,
    img: String,
    type: String,
    order: {type: Number, default: 0},
    state: {type: Number, default: 0},
    create_at: String,
    modify_at: String
});

module.exports = mongoose.model('Product', ProductSchema);