'use strict';

var _index = require('../index.js');

var SF = _interopRequireWildcard(_index);

var _data = require('data.task');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var cannedContent = require('./books.sparql.json');
var cannedResponse = { body: JSON.stringify(cannedContent), statusCode: 200 };
var env = {
    queryEndpoint: 'test',
    updateEndpoint: 'test',
    fetch: function fetch(req, cb) {
        cb(null, cannedResponse);
    },
    post: function post(req, cb) {
        cb(null, { statusCode: 201, body: 'applied update: ' + JSON.stringify(req) });
    }
};

var Sparql = SF.sparql(_data2.default);
Sparql.query('SELECT ?s ?name \n    WHERE { \n        ?s a foaf:Person; foaf:name ?name .  \n}').chain(Sparql.parseJSON).map(SF.resultBindings).run(env).fork(console.error, console.log);

