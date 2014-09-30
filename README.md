#RAML to PDF

RAML to PDF documentation generator, written for Node.js. Build on [raml2html](https://github.com/kevinrenskers/raml2html) and [node-wkhtmltopdf](https://github.com/devongovett/node-wkhtmltopdf).

##Configuration

You can modify the `congfig.js` file on your environment

```javascript
exports.ipAddress = 'http://127.0.0.1';
exports.port = 8000;
exports.publicDirname = "" + __dirname + "/public";
//The resource files floder that render HTML.

exports.mainTemplate = "" + __dirname + "/templates/template.handlebars";
exports.resourceTemplate = "" + __dirname + "/templates/resource.handlebars";
exports.itemTemplate = "" + __dirname + "/templates/item.handlebars";
//HTML template.

//If you Windows user, you maybe change like this.
//exports.wkhtmltopdfCommand = 'C:/wkhtmltopdf/bin/wkhtmltopdf.exe'
//wkhtml2pdf command line tool path.
//Default is 'wkhtmltopdf', you could not specify it if in linux.
```

##Installation

First, you need to choose suitable [Wkhtmltopdf](http://wkhtmltopdf.org/downloads.html) version, then download and install it to your system.

Because of various platform specific, the recommendatory versions are follows(more description can see [node-wkhtmltopdf](https://github.com/devongovett/node-wkhtmltopdf)):

-	On OS X, use version 0.10.
-	On Ubuntu, I use version 0.9.9 32 or 64 bit from that page. Don't try to use the version installed via apt-get because it is missing features and requires and X server. Follow this guide to make sure you have all the necessary dependencies.

After installation, be sure `wkhtmltopdf` command line tool is in your system PATH. If you don't want to do this for some reason, you can change the `exports.wkhtmltopdfCommand` property to the `wkhtmltopdf` path in `config.js` file.

##Usage

By default configuration, the api access address:

**POST**  	 http://127.0.0.1:8000/raml2pdf

Request Data:

>**Notice**   The raml must be formatted, yuo can see `example.json`

```json
{
	"raml":"#%RAML 0.8\n---\ntitle: Example API"
}
```

Response Data:

-	**200**

-	**500**
	
	```json
	{
		"error": "No RAML Specification defined"
	}
	```
	No raml parameter.

	```json
	{
		"error": "Error Parsing RAML Specification"
	}
	```
	Wrong RAML specification.

	```json
	{
		"error": "Error Generate PDF"
	}
	```
	PDF generation fails.

##Example

You can find example RAML, Request JSON, PDF and Image in examples folder.
![PDF example](https://raw.githubusercontent.com/our-bts/raml2pdf/master/examples/example.png)

##License

MIT
