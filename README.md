#RAML to PDF

RAML to PDF documentation generator, written for Node.js. Build on [raml2html](https://github.com/kevinrenskers/raml2html) and [node-wkhtmltopdf](https://github.com/devongovett/node-wkhtmltopdf).

##Configuration

根据需要可修改根目录下的`congfig.js`

```javascript
exports.ipAddress = 'http://127.0.0.1';
exports.port = 8000;
exports.apiPrefix = '/framework/v1';
exports.publicDirname = "" + __dirname + "/public";
//供渲染HTML需要的资源文件

exports.mainTemplate = "" + __dirname + "/templates/template.handlebars";
exports.resourceTemplate = "" + __dirname + "/templates/resource.handlebars";
exports.itemTemplate = "" + __dirname + "/templates/item.handlebars";
//HTML模版文件

exports.wkhtmltopdfCommand = 'C:/wkhtmltopdf/bin/wkhtmltopdf.exe'
//wkhtml2pdf命令位置
//Default is 'wkhtmltopdf', you could not specify it if in linux.
```

##Install

首先，需要选择合适的[Wkhtmltopdf](http://wkhtmltopdf.org/downloads.html)版本，下载并安装到系统中。

由于平台之间的差异，推荐使用的版本如下（更详细的安装使用请查看[node-wkhtmltopdf](https://github.com/devongovett/node-wkhtmltopdf)）：

-	On OS X, use version 0.10.
-	On Ubuntu, I use version 0.9.9 32 or 64 bit from that page. Don't try to use the version installed via apt-get because it is missing features and requires and X server. Follow this guide to make sure you have all the necessary dependencies.

安装成功后，确保添加`wkhtmltopdf`命令在你的系统环境变量中。如果不能，可以在`config.js`文件中修改`exports.wkhtmltopdfCommand`变量为`wkhtmltopdf`命令所在路径。

##Usage

根据默认配置，所访问的API地址为：

**POST**	http://127.0.0.1:8000/framework/v1/generatepdf

Request Data:

```json
{
	"raml":"#%RAML 0.8\n---\ntitle: Example API"
}
```

Response Data:

-	200

-	500  
	
	```json
	{
		"error": "No RAML Specification defined"
	}
	```
	缺少RAML请求数据

	```json
	{
		"error": "Error Parsing RAML Specification"
	}
	```
	RAML格式有误，解析出错

	```json
	{
		"error": "Error Generate PDF"
	}
	```
	PDF生成出错
