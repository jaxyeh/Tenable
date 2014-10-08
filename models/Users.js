var users = {
    admin: {
        password: 'password'
    }
};

exports.validate = function (username, password, callback) {
    var user = users[username];
    if (!user) return callback(null, false);
    if (password == user.password) {
        callback(null, true, { username: username });
    }
};