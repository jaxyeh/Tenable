var Hoek = require('hoek');
var Boom = require('boom');
var Joi = require('joi');

// Default Values
var LIMIT = 10;
var SKIP = 0;
var SORT = '_id';
var ORDER = 1;

// Find All Configurations
exports.findAll = {
    validate: {
        query: {
            limit: Joi.number().optional(),
            skip: Joi.number().optional(),
            sort: Joi.string().regex(/^\-?[a-zA-Z]*$/).optional()
            // Example regex that allows multiple sort (e.g. "name,hostname", "-name,hostname,-port")
            // sort: Joi.string().regex(/^\-?[a-zA-Z]+(?:\,\-?[a-zA-Z]+)*$/).optional()
        }
    },
    handler: function (request, reply) {
        var options = {};
        var sortObj = {};

        // Maximum number of entries query will return
        options['limit'] = request.query.limit || LIMIT;

        // Define where MongoDB begins returning results (i.e. Pagination)
        options['skip'] = request.query.skip || SKIP;

        // Define which field to be sorted
        // "-" prefix will specify descending order instead of ascending
        if (request.query.sort) {
            var sortBy = request.query.sort;
            if (sortBy.indexOf("-") > -1) {
                sortObj[sortBy.substring(1)] = -1;
                options['sort'] = sortObj;
            } else {
                sortObj[sortBy] = 1;
                options['sort'] = sortObj;
            }
        } else {
            sortObj[SORT] = ORDER;
            options['sort'] = sortObj;
        }

        /**
         * Developer Note:
         *
         * I tried to allow multiple sorting, but there is problem with converting JSON
         * into BSON object with order. In BSON, the order of keys always matters.
         * However, in JSON an object is an unordered set of key/value pairs.
         *
         * E.g. "name,-hostname" should be in "{ name: 1, hostname: -1 }" instead of
         * object default key ordering such as "{ hostname: -1, name: 1 }".
         *
         * Since the code gets too complicated when attempt doing multiple sort,
         * I decided to abandoned the new idea since its already beyond the scope
         * of requirement.
         */

        var db = request.server.plugins['hapi-monk'].db;
        db.get('configurations').find({}, options, function (err, configs){
            if (err || !configs) return reply(Boom.notFound(err));
            reply({"configurations": configs });
        });
    }
};

// Create Config
exports.create = {
    validate: {
        payload: {
            name: Joi.string().required(),
            hostname: Joi.string().required().hostname(), // Can be improved with IP validation
            port: Joi.number().required().min(1).max(65535),
            username: Joi.string().required().alphanum().min(3).max(64)
        }
    },
    handler: function (request, reply) {
        // Retrieve DB Instance
        var db = request.server.plugins['hapi-monk'].db;
        // Assign Payload Data
        var dataset = {
            name: request.payload.name,
            hostname: request.payload.hostname,
            port: request.payload.port,
            username: request.payload.username
        };
        // Create Configuration
        db.get('configurations').insert(dataset, function (err, config) {
            if (err) return reply(Boom.internal(err)); // 500 Internal Error
            if (!config._id) return reply(Boom.internal('Failed to retrieve new user id', dataset));
            return reply({ status: 'ok', id: config._id }).code(201);
        });
    }
};

// Update Config
exports.update = {
    validate: {
        params: {
            id: Joi.string().required() // Requires ObjectId
        },
        payload: {
            name: Joi.string().required(),
            hostname: Joi.string().required().hostname(), // Can be improved with IP validation
            port: Joi.number().required().min(1).max(65535),
            username: Joi.string().required().alphanum().min(3).max(64)
        }
    },
    handler: function (request, reply) {
        // Retrieve DB Instance
        var db = request.server.plugins['hapi-monk'].db;
        // Assign Payload Data
        var dataset = {
            name: request.payload.name,
            hostname: request.payload.hostname,
            port: request.payload.port,
            username: request.payload.username
        };
        // Find and Update Configuration
        db.get('configurations').findAndModify({ _id: encodeURIComponent(request.params.id) },
                { $set: dataset }, {multi:false}, function(err, config){
            if (err) return reply(Boom.internal(err));
            else if (config) return reply({ status: 'ok' }); // Returns 200 OK
            else return reply(Boom.notFound());
        });
    }
};

// Remove Config
exports.remove = {
    validate: {
        params: {
            id: Joi.string().required() // Requires ObjectId
        }
    },
    handler: function (request, reply) {
        // Retrieve DB Instance
        var db = request.server.plugins['hapi-monk'].db;
        // Remove Configuration
        db.get('configurations').remove({_id: encodeURIComponent(request.params.id) }, function(err) {
            if (err) return reply(Boom.internal(err));
            return reply({}).code(204);
        });
    }
};

/**
 * INTERNAL HELPER FUNCTION FOR TESTING PURPOSE
 */

exports.purge = {
    handler: function (request, reply) {
        // Retrieve DB Instance
        var db = request.server.plugins['hapi-monk'].db;
        // Drop all data in collection
        db.get('configurations').drop(function(err) {
            if (err) return reply(Boom.internal(err));
            return reply({}).code(200);
        });
    }
};


