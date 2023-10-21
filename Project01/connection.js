const mongoose = require('mongoose');

async function connectMongoDb(url ) {
    return mongoose.connect(url)
        .then(() => console.log('mongo connected'))
        .catch((err) => console.log('mongo ki error', err))
}

module.exports = {
    connectMongoDb,
}
