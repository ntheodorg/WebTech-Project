const App = require('./utils/app.js');
const routers = require(`./routers/index`)

// Create App instance with a specific port
app = new App(4000);

// Import in our App instance static assets such as: .css, .png, .jpg files
app.importAsset("/Styles-CSS", "./public");
app.importAsset("/Resources", "./public");
app.importAsset("/Scripts-JS", "./public");

// Use routers in our App instance
app.use(routers.staticRouter);

// Start app
app.listen();