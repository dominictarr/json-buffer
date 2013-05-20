
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
  }
}

for(k in examples)
(function (value, k) { 
  test(k, function (t) {
    var s = _JSON.stringify(value)
    var _value = _JSON.parse(s)
    t.deepEqual(toJSON(_value), toJSON(value))
    console.log(k, value)
    t.end()
  })
})(examples[k], k)

