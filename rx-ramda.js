var R = require('ramda')
var Rx = require('rx')
var reduceReducers = require('reduce-reducers')

var transduce = R.compose(
    R.partial(R.transduce),
    R.unapply(R.identity)
)

var increment = transduce(
    R.filter(a => a.type === 'INC'),
    R.compose(R.add(1))
)

var decrement = transduce(
    R.filter(a => a.type === 'DEC'),
    R.compose(R.flip(R.subtract)(1))
)

var rootReducer = reduceReducers(increment, decrement)

var dispatch = (action) => R.partialRight(rootReducer, [[action]])

var subject = new Rx.Subject()

var sequence = subject.map(a => dispatch(a))

Rx.Observable
    .merge(sequence)
    .startWith(0)
    .scan((x, f) => f(x))
    .subscribe((s) => {
        console.log(s)
    })

subject.onNext({ type: 'INC' })
subject.onNext({ type: 'INC' })
subject.onNext({ type: 'DEC' })
