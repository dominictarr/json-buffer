
var test = require('tape')
var _JSON = require('../')

function toJSON (o) {
  return JSON.parse(JSON.stringify(o))
}

var examples = {
  simple: { foo: [], bar: {}, baz: new Buffer('some binary data') },
  just_buffer: new Buffer('JUST A BUFFER'),
  all_types: {
    string:'hello',
    number: 3145,
    null: null,
    object: {},
    array: [],
    boolean: true,
    boolean2: false
  },
  foo: new Buffer('foo'),
  foo2: new Buffer('foo2'),
  escape: {
    buffer: new Buffer('x'),
    string: _JSON.stringify(new Buffer('x'))
  },
  escape2: {
    buffer: new Buffer('x'),
    string: ':base64:'+ new Buffer('x').toString('base64')
  },
  undefined: {
    empty: undefined
  },
  fn: {
    fn: function () {}    
  }
}

for(k in examples)
(function (value, k) { 
  test(k, function (t) {
    var s = _JSON.stringify(value)
    console.log(s)
    var _value = _JSON.parse(s)
    t.deepEqual(toJSON(_value), toJSON(value))
    t.end()
  })
})(examples[k], k)

