const mongoose = require('mongoose');

 
const paymentmanagementSchema = new mongoose.Schema({
    Payee:  { type: String, required: true},
    amount:  { type: mongoose.Decimal128, required: true},
    reciever: {type: String, required: true},
    paymenttype: {type: String, required: true},
});
 
module.exports = mongoose.model('PaymentManagement', paymentmanagementSchema,'PaymentManagements');
