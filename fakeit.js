var faker = require('faker');
var fs = require('fs');

// Generate 300,000 fake "config" entries into json file
var data = '';
for (i = 0; i < 300000; i++) {
    var dataset = {
        name: faker.company.companyName(),
        hostname: faker.internet.domainName(),
        port: faker.random.number({ min: 22, max: 65535 }),
        username: faker.internet.userName()
    };
    data = data.concat(JSON.stringify(dataset) + '\n');
    if (i % 1000 === 0) {
        console.log("Generated " + i + " fake config entries");
    }
}

// Write to file
fs.writeFile('fakedata.json', data, function (err) {
    if (err) throw err;
    console.log('The data has been saved to file!');
});
