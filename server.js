const App = require('./utils/app.js');
const routers = require(`./routers/index`);
const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://aleigo:aleigo792035@clearly.sxg4p.mongodb.net/Clearly?retryWrites=true&w=majority';

// Create App instance with a specific port
app = new App(4000);

// Import in our App instance static assets such as: .css, .png, .jpg files
app.importAsset("/Styles-CSS", "./public");
app.importAsset("/Resources", "./public");
app.importAsset("/Scripts-JS", "./public");


// connect to mongoDB

// Use routers in our App instance
app.use(routers.staticRouter);
app.use(routers.pinRouter);
app.use(routers.commonRouter);

// connect to mongoDB
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology:true})
    .then((result) => app.listen())
    .catch((err) => console.log(err));
