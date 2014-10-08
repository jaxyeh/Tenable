//var Authentication = require('./controllers/authentication'); // Only needed for Cookie Session
var Configurations = require('./controllers/configurations');

/**
 * Contains the list of all routes including methods, paths and the config functions
 * that take care of the actions
 */
exports.endpoints = [

    /**
     * An alternative example approach using cookie session
     */
    //{ method: 'GET',    path: '/',                      config: Authentication.index },
    //{ method: 'POST',   path: '/v1/auth/login',         config: Authentication.login },
    //{ method: 'GET',    path: '/v1/auth/logout',        config: Authentication.logout },

    { method: 'GET',    path: '/v1/config',             config: Configurations.findAll },
    { method: 'PUT',    path: '/v1/config',             config: Configurations.create },
    { method: 'POST',   path: '/v1/config/{id}',        config: Configurations.update },
    { method: 'DELETE', path: '/v1/config/{id}',        config: Configurations.remove },
    { method: 'DELETE', path: '/v1/config/purge',       config: Configurations.purge },
];