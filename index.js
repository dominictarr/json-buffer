var Buffer = require('buffer').Buffer

//TODO: handle reviver/dehydrate function like normal
//and handle indentation, like normal.
//if anyone needs this... please send pull request.

exports.stringify = function stringify (o) {
  if(o && Buffer.isBuffer(o))
    o = o.toString('base64')

  if(o && o.toJSON)
    o = o.toJSON()

  if(o && 'object' === typeof o) {
    var s = ''
    var array = Array.isArray(o)
    s = array ? '[' : '{'
    var first = true

    for(var k in o) {
      if(Object.hasOwnProperty.call(o, k)) {
        if(!first)
          s += ', '
        first = false
        s += array ? stringify(o[k]) : stringify(k) + ': ' + stringify(o[k])
      }
    }

    s += array ? ']' : '}'

    return s
  } else
    return JSON.stringify(o)
}

exports.parse = function (s) {
  return JSON.parse(s, function (key, value) {
    if('string' === typeof value && /==$/.test(value))
      return new Buffer(value, 'base64')
    return value
  })
}
