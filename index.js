var byteStream = require('byte-stream')
var combiner = require('stream-combiner')
var through = require('through')

function uuid() {
  return Math.random().toString(16).slice(2)
}

function getSize(row) {
  // reserve 8 bits for key
  return 8 + row.length
}

module.exports = function(db, bufferSize) {
  var batchStream = byteStream(bufferSize, getSize)
  var saver = through(write)

  return combiner(batchStream, saver)

  function write(rows) {
    var batch = db.batch()
    for (var i = 0; i < rows.length; i++) {
      batch.put(uuid(), rows[i])
    }
    batch.write(function() {
      batchStream.next()
    })
  }
}
