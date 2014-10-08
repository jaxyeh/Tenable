
# Introduction


## Install

Install Mongo by following the [official install|http://docs.mongodb.org/manual/installation/] instructions.

    $ git clone git://github.com/jaxyeh/tenable.git
    $ npm install
    $ cp config.js.example config.js
    $ npm start

# Testing

    $ npm test

# API Documentation

Open browser and run 

    http://localhost:8080/documentation

    
## Generate & Import "fake" configurations data

Run `fakeit.js` to generate fake data into `fakedata.json` json file (about 27mb). 

    $ node fakeit.js

Import the fake data into MongoDB using `mongoimport` tool.

    $ mongoimport --db test --collection configurations --file fakedata.json

## Quick and dirty way to retrieve thousands entries

Usually, web browser does not do well with very large data. You might get better experience using curl queries instead.

    $ curl http://<user>:<pass>@localhost:8080/v1/config?limit=100000

