const mongoose = require('mongoose');

// connect to mongoDB
const dbURI = 'mongodb+srv://aleigo:aleigo792035@clearly.sxg4p.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology:true})
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));
