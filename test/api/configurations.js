require('../../mocha-startup');
var hippie = require('hippie');

hippie.assert.showDiff = true;

// Standard API requirements
function testApi() {
    return hippie()
        .json()
        .base('http://localhost:8080/v1')
        //.auth('user', 'pass')
        .expectHeader('Content-Type', 'application/json; charset=utf-8')
}

describe('Test Configurations API', function () {

    var config_id; // Temporary placeholder for config ObjectId

    describe('List Configurations', function () {

        it('returns list of configs', function (done) {
            testApi()
                .get('/config')
                .expectStatus(200)
                .end(function(err, res, body) {
                    if (err) throw err;
                    done();
                });
        });

    });

    describe('Create Configurations', function () {

        it('create config', function (done) {
            testApi()
                .put('/config')
                .send({
                    "name": "host1",
                    "hostname": "nessus-ntp.lab.com",
                    "port": 1241,
                    "username":"toto"
                })
                .expectStatus(201)
                .expectBody(/ok/)
                .expectBody(/id/)
                .end(function(err, res, body) {
                    if (err) throw err;
                    config_id = body.id;
                    console.log("       New Created ID: " + config_id);
                    done();
                });
        });

        it('415 Unsupported Media Format', function (done) {
            testApi()
                .put('/config')
                .send('{"name": "host1","hostname": "nessus-ntp.lab.com","port": 1241,"username":"toto"}')
                .expectStatus(415)
                .expectBody({
                    "statusCode": 415,
                    "error": "Unsupported Media Type",
                    "message": "payload must represent an object"})
                .end(function(err, res, body) {
                    if (err) throw err;
                    done();
                });
        });

    });

    describe('Update Configurations (POST - /config/{id})', function () {

        it('update config', function (done) {
            testApi()
                .post('/config/' + config_id)
                .send({
                    "name": "host2",
                    "hostname": "nessus-ntp.lab.com",
                    "port": 1241,
                    "username":"toto"
                })
                .expectStatus(200)
                .expectBody({ status: 'ok' })
                .end(function(err, res, body) {
                    if (err) throw err;
                    done();
                });
        });

    });

    describe('Remove Configurations (DELETE - /config/{id})', function () {

        it('delete config', function (done) {
            testApi()
                .del('/config/' + config_id)
                .expectStatus(204)
                .end(function(err, res, body) {
                    if (err) throw err;
                    done();
                });
        });

    });

});