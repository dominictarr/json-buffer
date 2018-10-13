//TODO: handle reviver/dehydrate function like normal
//and handle indentation, like normal.
//if anyone needs this... please send pull request.

function stringify (o, gap, indentation) {
  if('undefined' == typeof o) return o

  if(o && Buffer.isBuffer(o))
    return JSON.stringify(':base64:' + o.toString('base64'), null, gap)

  if(o && o.toJSON)
    o =  o.toJSON()

  if(o && 'object' === typeof o) {
    var array = Array.isArray(o)
    var s = array ? '[' : '{'
    var first = true
    var childstr = ''
    var breakindent = '\n' + gap.repeat(indentation + 1)

    for(var k in o) {
      var ignore = 'function' == typeof o[k] || (!array && 'undefined' === typeof o[k])
      if(Object.hasOwnProperty.call(o, k) && !ignore) {
        if(!first) {
          childstr += ','
          if(gap) childstr += breakindent
        }
        first = false
        if (array) {
          if(o[k] == undefined)
            s += 'null'
          else
            childstr += stringify(o[k], gap, indentation + 1)
        } else if (o[k] !== void(0)) {
          childstr += stringify(k, gap, indentation + 1) + ':' + (gap ? ' ' : '') + stringify(o[k], gap, indentation + 1)
        }
      }
    }

    if(childstr) {
      if(gap) s += breakindent
      s += childstr
      if(gap) s += '\n' + gap.repeat(indentation)
    }

    s += array ? ']' : '}'

    return s
  } else if ('string' === typeof o) {
    return JSON.stringify(/^:/.test(o) ? ':' + o : o, null, gap)
  } else if ('undefined' === typeof o) {
    return 'null';
  } else
    return JSON.stringify(o, null, gap)
}

exports.stringify = function(o, replacer, space) {
    var gap = ''
    if(typeof space == 'number') {
      gap = ' '.repeat(Math.min(10, space))
    } else if(typeof space == 'string') {
      gap = space.slice(0, 10)
    }

    return stringify(o, gap, 0)
}

exports.parse = function (s) {
  return JSON.parse(s, function (key, value) {
    if('string' === typeof value) {
      if(/^:base64:/.test(value))
        return Buffer.from(value.substring(8), 'base64')
      else
        return /^:/.test(value) ? value.substring(1) : value
    }
    return value
  })
}
