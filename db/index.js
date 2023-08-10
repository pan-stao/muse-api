const conectFn = require('./connect')
const userCollections = require('./collections/userCollections')

conectFn()


const db = {
    // 集合
    userCollections,

}

module.exports = db;