const App = require('../../utils/app.js');
const router = require(`./router`);
const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://aleigo:aleigo792035@clearly.sxg4p.mongodb.net/Clearly?retryWrites=true&w=majority';

// Create App instance with a specific port
app = new App(4444);

// Use routers in our App instance
app.use(router);

// connect to mongoDB
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology:true})
    .then((result) => app.listen())
    .catch((err) => console.log(err));
