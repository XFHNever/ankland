/**
 * Created by xiefuheng on 15/6/5.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    password: String,
    role: {type: Number, default: 0},
});

module.exports = mongoose.model('User', UserSchema);