# Introduction

This is a Node.JS application providing basic RESTful API server for Tenable.

## Prerequisites

This application uses Node.JS and MongoDB backend for data storage, therefore MongoDB is required. Install Node.JS, and then MongoDB by following the [official install|http://docs.mongodb.org/manual/installation/] instructions and add a new database.

After prerequisites is installed, clone this repo, and run `npm install`:

    $ git clone git://github.com/jaxyeh/tenable.git
    $ cd tenable
    $ npm install

You will need to copy `config.js.example` to `config.json`, then adjust the configuration to your machine setup. After it's configured, run the server.
    
    $ cp config.js.example config.js
    $ npm start

## API Documentation

While Node.JS Server is running, open web browser and go to:

    http://localhost:8080/documentation
    
> Note: You may need to replace port address

## Testing Code

The system comes with [Mocha|http://visionmedia.github.io/mocha/] and [Hippie|https://github.com/vesln/hippie] tools to provide end-to-end API testing. You can run the test with the following command: 

    $ npm test

> Note: Unit tests or BDD assertion tests is not yet included, the application is too small with lack of extensible functions for further testing. Hopefully API testing is suffice.
  
## Generate & Import "fake" configurations data

Run `fakeit.js` to generate fake data into `fakedata.json` json file (~27MB):

    $ node fakeit.js

Import the fake data into MongoDB using `mongoimport` tool.

    $ mongoimport --db <database_name> --collection configurations --file fakedata.json

## Quick and dirty way to retrieve thousands entries

Usually, web browser does not do well with viewing very large data. You might get better experience using curl queries instead.

    $ curl http://<user>:<pass>@localhost:8080/v1/config?limit=100000

