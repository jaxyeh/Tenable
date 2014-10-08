var Hoek = require('hoek');
var Boom = require('boom');
var Joi = require('joi');

exports.index = {
    handler: function (request, reply) {
        var data =
            '<h1> Welcome Tenable\'s to API Web Service! </h1>';
        reply(data);
    }
};

exports.login = {
    handler: function (request, reply) {
        reply({});
    }
};

exports.logout = {
    handler: function (request, reply) {
        reply({});
    }
};