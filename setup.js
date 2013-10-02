// download 1994.csv from http://stat-computing.org/dataexpo/2009/the-data.html
var fs = require('fs')
var batcher = require('./')
var level = require('level')
var csvStream = fs.createReadStream('1994.csv')
var bufferSize = 1024 * 1024 * 16

module.exports = function(cb) {
  var db = level('test.db', {writeBufferSize: bufferSize}, function() {
    var writeStream = batcher(db, bufferSize)
    cb(csvStream, writeStream)
  })  
}
