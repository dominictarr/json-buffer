var Buffer = require('buffer').Buffer
var traverse = require('traverse')

//TODO: handle reviver/dehydrate function like normal
//and handle indentation, like normal.
//if anyone needs this... please send pull request.

exports.stringify = function stringify (o) {
  if (Buffer.isBuffer(o)) {
    o = 'base64:' + o.toString('base64')
  } else if ('object' == typeof o) {
    o = traverse(o).map(function (x) {
      if (Buffer.isBuffer(x)) this.update('base64:' + x.toString('base64'))
    })
  }
  return JSON.stringify(o)
}

exports.parse = function (s) {
  return JSON.parse(s, function (key, value) {
    return ('string' == typeof value && /^base64:/.test(value))
      ? new Buffer(value.split('base64:')[1], 'base64')
      : value
  })
}
