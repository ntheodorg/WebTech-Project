const App = require('./utils/app.js');
const routers = require(`./routers/index`)

app = new App(4000);
app.importAsset("Styles-CSS", "./public");
app.importAsset("Resources", "./public");
app.importAsset("Scripts-JS", "./public");

app.use(routers.staticRouter);
// app.use();

app.listen();