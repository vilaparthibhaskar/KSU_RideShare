const mongoose = require('mongoose');

 
const schedulerideSchema = new mongoose.Schema({
    source:  { type: String, required: true},
    destination:  { type: String, required: true},
    phoneNumber:  { type: mongoose.Decimal128, required: true},
    pickupTime: {type: String, required: true}
});
 
module.exports = mongoose.model('Scheduleride', schedulerideSchema,'Schedulerides');
