
## Introduction


# API Documentation

Open browser and run 

    http://localhost:8080/documentation
    
## Generate & Import "fake" configurations data

Run `fakeit.js` to generate fake data into `fakedata.json` json file (about 27mb). 

    $ node fakeit.js

Import the fake data into MongoDB using `mongoimport` tool.

    $ mongoimport --db test --collection configurations --file fakedata.json

## Quick and dirty way to lists thousands entries

    $ curl http://localhost:8080/v1/config?limit=100000

