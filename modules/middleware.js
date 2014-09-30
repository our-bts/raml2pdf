var config, generateHtmlByRaml, raml2HtmlConfig, raml2html, url, wkhtmltopdf;

url = require('url');

wkhtmltopdf = require('wkhtmltopdf');

raml2html = require('./raml2html');

config = require('../config');

raml2HtmlConfig = raml2html.getDefaultConfig(config.mainTemplate, config.resourceTemplate, config.itemTemplate);

wkhtmltopdf.command = config.wkhtmltopdfCommand || wkhtmltopdf.command;

exports.generatePdf = function(req, res, next) {
  var uri;
  uri = url.parse(req.url).pathname;
  if (uri.toLowerCase() === ("/raml2pdf") && req.method === 'POST') {
    if (req.body.raml == null) {
      return next(new Error('No RAML Specification defined'));
    }
    res.setHeader('Content-Type', 'application/pdf');
    return generateHtmlByRaml(req.body.raml, function(err, result) {
      if (err) {
        return next(err);
      } else {
        return wkhtmltopdf(result, function(err) {
          if (err) {
            return next(new Error('Error Generate PDF'));
          }
        }).pipe(res);
      }
    });
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 404;
    return res.end('Not Found.');
  }
};

exports.errorHandler = function(err, req, res, next) {
  res.statusCode = 500;
  res.setHeader('Content-Type', 'application/json');
  return res.end(JSON.stringify({
    error: err.message
  }));
};

generateHtmlByRaml = function(raml, callback) {
  raml2HtmlConfig.urlPrefix = "" + config.ipAddress + ":" + config.port;
  return raml2html.render(raml, raml2HtmlConfig, function(result) {
    return callback(null, result);
  }, function(err) {
    return callback(new Error('Error Parsing RAML Specification'));
  });
};
