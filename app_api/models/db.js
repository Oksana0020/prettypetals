// app_api/models/db.js
const mongoose = require('mongoose');
const dbURI = "mongodb+srv://user1:mtu12345@cluster0.xxa6u.mongodb.net/PrettyPetals?retryWrites=true&w=majority&appName=Cluster0";

try {
  mongoose.connect(
    dbURI,
    { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => {console.log(" Mongoose is connected")},
	err=> {console.log(err)}
	);
} catch (e) {
    console.log("Could not connect", e);
}
require('./flowers');



