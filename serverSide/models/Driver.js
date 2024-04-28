const mongoose = require('mongoose');

 
const driverSchema = new mongoose.Schema({
    Name:  { type: String, required: true},
    phoneNumber:  { type: mongoose.Decimal128, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    zipcode: {type: String, required: true},
    city: {type: String, required: true},
    carModel: {type: String, require: true}
});
 
module.exports = mongoose.model('Driver', driverSchema,'Drivers');
