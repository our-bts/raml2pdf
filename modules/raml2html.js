'use strict';

var raml2obj = require('raml2obj');
var handlebars = require('handlebars');
var marked = require('marked');
var fs = require('fs');
var Minimize = require('minimize');
var renderer = new marked.Renderer();
var minimize = new Minimize();

renderer.table = function(thead, tbody) {
    return "<table class='table'><thead>" + thead + "</thead><tbody>" + tbody + "</tbody></table>";
};

renderer.heading = function(text, level) {
    return "<div class='heading-" + level + "'>" + text + "</div>";
};
      
function _markDownHelper(text) {
    if (text && text.length) {
        return new handlebars.SafeString(marked(text, { renderer: renderer }));
    } else {
        return '';
    }
}

function _lockIconHelper(securedBy) {
    if (securedBy && securedBy.length) {
        var index = securedBy.indexOf(null);
        if (index !== -1) {
            securedBy.splice(index, 1);
        }
        if (securedBy.length) {
            return new handlebars.SafeString(' <span class="glyphicon" title="Authentication required">*</span>');
        }
    }
    return '';
}

function _emptyResourceCheckHelper(options) {
    if (this.methods || (this.description && this.parentUrl)) {
      return options.fn(this);
    }
}

function _parsePath(templateParam) {
    if (templateParam) {
        if (program.template.indexOf('.') == 0) {
            return process.cwd() + '/' + templateParam;
        }
        return templateParam;
    }
}

function _ifRequest(parameters, method, options) {
    if((parameters.length !=0) || method.hasOwnProperty('headers') || method.hasOwnProperty('queryParameters') || method.hasOwnProperty('body')){
        return options.fn(this);
    }else{
        return options.inverse(this);
    }
}

function render(source, config, onSuccess, onError) {
    config = config || {};

    // Register handlebar helpers
    for (var helperName in config.helpers) {
        if (config.helpers.hasOwnProperty(helperName)) {
            handlebars.registerHelper(helperName, config.helpers[helperName]);
        }
    }

    // Register handlebar partials
    for (var partialName in config.partials) {
        if (config.partials.hasOwnProperty(partialName)) {
            handlebars.registerPartial(partialName, config.partials[partialName]);
        }
    }

    raml2obj.parse(source, function(ramlObj) {
        ramlObj.urlPrefix = config.urlPrefix;
        var result = config.template(ramlObj);

        if (config.processOutput) {
            config.processOutput(result, onSuccess, onError)
        } else {
            onSuccess(result);
        }
    }, onError);
}

function getDefaultConfig(mainTemplate, resourceTemplate, itemTemplate) {
    return {
        'https': false,
        'template': require(mainTemplate),
        'helpers': {
            'emptyResourceCheck': _emptyResourceCheckHelper,
            'md': _markDownHelper,
            'lock': _lockIconHelper,
            'ifRequest': _ifRequest
        },
        'partials': {
            'resource': require(resourceTemplate),
            'item': require(itemTemplate)
        },
        processOutput: function(data, onSuccess, onError) {
            data = data.replace(/&quot;/g, '"');

            minimize.parse(data, function(error, result) {
                if (error) {
                    onError(error);
                } else {
                    onSuccess(result);
                }
            });
        }
    };
}

module.exports.getDefaultConfig = getDefaultConfig;
module.exports.render = render;