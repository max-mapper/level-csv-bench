// runs in 1m11s
var binaryCSV = require('binary-csv')
var setup = require('./setup')
setup(function(csvStream, writeStream) {
  csvStream.pipe(binaryCSV()).pipe(writeStream)
})
