const express = require('express');
const app = express();
const bodyParser  = require('body-parser');
const mongoose = require('mongoose');

const Driver = require('./models/Driver')
const Rider = require('./models/Rider')
const Scheduleride = require('./models/Scheduleride')
const PaymentManagement = require('./models/PaymentManagement');


mongoose.connect('mongodb+srv://KSURide:ABMM%402024@ksu.emqz8hy.mongodb.net/?retryWrites=true&w=majority&appName=KSU')
.then(() => {
    console.log("Mongodb connection succesful");
}).catch((e) => {
    console.log("connection unsuccesful");
    console.log(e);
})


app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});


app.get('/drivers', (req, res, next) => {
    Driver.find() 
        .then(data => res.status(200).json(data))
.       catch(err => {
            console.log('Error: ${err}');
            res.status(500).json(err);
    });
});


app.get('/drivers/:id', (req, res, next) => {
    Driver.findOne({_id: req.params.id}) 
        .then(data => {
            res.status(200).json(data)
            console.log(data);
        })
        .catch(err => {
        console.log('Error: ${err}');
        res.status(500).json(err);
    });
});


app.post('/drivers', (req, res, next) => {
    const driver = new Driver({
        Name: req.body.Name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        address: req.body.address,
        zipcode: req.body.zipcode,
        city: req.body.city,
        carModel: req.body.carModel
    });
    driver.save()
        .then(() => { console.log('Success');})
        .catch(err => {console.log('Error:' + err);
    });
    res.status(201).json('Post successful');
});


app.put('/drivers/:id', (req, res, next) => { 
    console.log("id: " + req.params.id) 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
        Driver.findOneAndUpdate( 
            {_id: req.params.id}, 
            {$set:{ 
                Name : req.body.Name, 
                phoneNumber : req.body.phoneNumber,
                email:  req.body.email,
                address: req.body.address,
                zipcode: req.body.zipcode,
                city: req.body.city,
                carModel: req.body.carModel
            }}, 
            {new:true} 
        ) 
        .then((driver) => { 
            if (driver) {
                console.log(driver); 
            } else { 
                console.log("no data exist for this id"); 
            } 
        }) 
        .catch((err) => { 
            console.log(err); 
        }); 
    } else { 
        console.log("please provide correct id"); 
    } 
});

app.delete("/drivers/:id", (req, res, next) => {
    Driver.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
});

app.get('/riders', (req, res, next) => {
    Rider.find() 
        .then(data => res.status(200).json(data))
.       catch(err => {
            console.log('Error: ${err}');
            res.status(500).json(err);
    });
});


app.get('/riders/:id', (req, res, next) => {
    Rider.findOne({_id: req.params.id}) 
        .then(data => {
            res.status(200).json(data)
            console.log(data);
        })
        .catch(err => {
        console.log('Error: ${err}');
        res.status(500).json(err);
    });
});


app.post('/riders', (req, res, next) => {
    const rider = new Rider({
        Name: req.body.Name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        city: req.body.city,
        zipcode: req.body.zipcode,
        address: req.body.address,
        carModel: req.body.carModel
    });
    rider.save()
        .then(() => { console.log('Success');})
        .catch(err => {console.log('Error:' + err);
    });
    res.status(201).json('Post successful');
});


app.put('/riders/:id', (req, res, next) => { 
    console.log("id: " + req.params.id) 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
        Rider.findOneAndUpdate( 
            {_id: req.params.id}, 
            {$set:{ 
                Name : req.body.Name, 
                phoneNumber : req.body.phoneNumber,
                email:  req.body.email,
                address: req.body.address,
                city: req.body.city,
                zipcode: req.body.zipcode,
                carModel: req.body.carModel
            }}, 
            {new:true} 
        ) 
        .then((rider) => { 
            if (rider) {
                console.log(rider); 
            } else { 
                console.log("no data exist for this id"); 
            } 
        }) 
        .catch((err) => { 
            console.log(err); 
        }); 
    } else { 
        console.log("please provide correct id"); 
    } 
});

app.delete("/riders/:id", (req, res, next) => {
    Rider.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
});


app.get('/schedulerides', (req, res, next) => {
    Scheduleride.find() 
        .then(data => res.status(200).json(data))
.       catch(err => {
            console.log('Error: ${err}');
            res.status(500).json(err);
    });
});


app.get('/schedulerides/:id', (req, res, next) => {
    Scheduleride.findOne({_id: req.params.id}) 
        .then(data => {
            res.status(200).json(data)
            console.log(data);
        })
        .catch(err => {
        console.log('Error: ${err}');
        res.status(500).json(err);
    });
});


app.post('/schedulerides', (req, res, next) => {
    const scheduleride = new Scheduleride({
        source: req.body.source,
        destination: req.body.destination,
        phoneNumber: req.body.phoneNumber,
        pickupTime: req.body.pickupTime
        
    });
    scheduleride.save()
        .then(() => { console.log('Success');})
        .catch(err => {console.log('Error:' + err);
    });
    res.status(201).json('Post successful');
});


app.put('/schedulerides/:id', (req, res, next) => { 
    console.log("id: " + req.params.id) 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
        Scheduleride.findOneAndUpdate( 
            {_id: req.params.id}, 
            {$set:{ 
                source: req.body.source,
                destination: req.body.destination,
                phoneNumber: req.body.phoneNumber,
                pickupTime: req.body.pickupTime
            }}, 
            {new:true} 
        ) 
        .then((scheduleride) => { 
            if (scheduleride) {
                console.log(scheduleride); 
            } else { 
                console.log("no data exist for this id"); 
            } 
        }) 
        .catch((err) => { 
            console.log(err); 
        }); 
    } else { 
        console.log("please provide correct id"); 
    } 
});

app.delete("/schedulerides/:id", (req, res, next) => {
    Scheduleride.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
});

app.get('/paymentmanagements', (req, res, next) => {
    PaymentManagement.find() 
        .then(data => res.status(200).json(data))
.       catch(err => {
            console.log('Error: ${err}');
            res.status(500).json(err);
    });
});


app.get('/paymentmanagements/:id', (req, res, next) => {
    PaymentManagement.findOne({_id: req.params.id}) 
        .then(data => {
            res.status(200).json(data)
            console.log(data);
        })
        .catch(err => {
        console.log('Error: ${err}');
        res.status(500).json(err);
    });
});


app.post('/paymentmanagements', (req, res, next) => {
    const paymentmanagement = new PaymentManagement({
        Payee: req.body.Payee,
        amount: req.body.amount,
        reciever: req.body.reciever,
        paymenttype: req.body.paymenttype
    });
    paymentmanagement.save()
        .then(() => { console.log('Success');})
        .catch(err => {console.log('Error:' + err);
    });
    res.status(201).json('Post successful');
});


app.put('/paymentmanagements/:id', (req, res, next) => { 
    console.log("id: " + req.params.id) 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
        PaymentManagement.findOneAndUpdate( 
            {_id: req.params.id}, 
            {$set:{ 
                Payee: req.body.Payee,
                amount: req.body.amount,
                reciever: req.body.reciever,
                paymenttype: req.body.paymenttype
            }}, 
            {new:true} 
        ) 
        .then((paymentmanagement) => { 
            if (paymentmanagement) {
                console.log(paymentmanagement); 
            } else { 
                console.log("no data exist for this id"); 
            } 
        }) 
        .catch((err) => { 
            console.log(err); 
        }); 
    } else { 
        console.log("please provide correct id"); 
    } 
});

app.delete("/paymentmanagements/:id", (req, res, next) => {
    PaymentManagement.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
});



module.exports=app;