exports.ipAddress = 'http://127.0.0.1';

exports.port = 8000;

exports.publicDirname = "" + __dirname + "/public";

exports.mainTemplate = "" + __dirname + "/templates/template.handlebars";

exports.resourceTemplate = "" + __dirname + "/templates/resource.handlebars";

exports.itemTemplate = "" + __dirname + "/templates/item.handlebars";

//Default is 'wkhtmltopdf', you could not specify it if in linux.
//If you Windows user, you maybe change like this.
//exports.wkhtmltopdfCommand = 'C:/wkhtmltopdf/bin/wkhtmltopdf.exe'