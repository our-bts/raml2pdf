var app, bodyParser, config, connect, cors, module, serveStatic;

connect = require('connect');

bodyParser = require('body-parser');

cors = require('cors');

serveStatic = require('serve-static');

module = require('./modules/middleware');

config = require('./config');

app = connect();

app.use(serveStatic(config.publicDirname));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use(cors());

app.use(module.generatePdf);

app.use(module.errorHandler);

app.listen(config.port, function() {
  return console.log("Listening on port at " + config.port);
});
