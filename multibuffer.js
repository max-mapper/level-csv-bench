// runs in 8m38s
var binaryCSV = require('binary-csv')
var multibuffer = require('multibuffer')
var through = require('through')
var setup = require('./setup')

setup(function(csvStream, writeStream) {
  var csv = binaryCSV()
  var csvToMultibuffer = through(write)
  csvStream.pipe(csv).pipe(csvToMultibuffer).pipe(writeStream)
  
  function write(row) {
    var cells = csv.line(row)
    for (var i = 0; i < cells.length; i++) {
      cells[i] = csv.cell(cells[i])
    }
    var mb = multibuffer.pack(cells) // with this line commented (and next line changed to `row`), runs in 3m9s
    this.queue(mb)
  }
})
