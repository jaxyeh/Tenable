var Boom = require('boom');
var Joi = require('joi');

var users = {
    admin: {
        password: 'password'
    }
};

exports.index = {
    handler: function (request, reply) {
        var data =
            '<h1> Welcome Tenable\'s to API Web Service! </h1>';
        reply(data);
    }
};

exports.login = {
    tags: ['api'],
    validate: {
        payload: {
            username: Joi.string().required(),
            password: Joi.string().required()
        }
    },
    handler: function (request, reply) {
        var user = users[request.payload.username] || null;
        if (!user || user.password !== request.payload.password) {
            return reply(Boom.unauthorized('Invalid username or password'));
        }
        request.auth.session.set(user);
        return reply({ status: 'ok' });
    }
};

exports.logout = {
    tags: ['api'],
    handler: function (request, reply) {
        request.auth.session.clear();
        return reply({ status: 'ok' });
    }
};