var R = require('ramda')
var reduceReducers = require('reduce-reducers')
var Container = require('./ramda-container')

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

var subject = (new Container)
    .initialState(0)
    .reducer(rootReducer)
    .subscribe((s) => {
        console.log(s)
    })

subject.onNext({ type: 'INC'})
subject.onNext({ type: 'INC'})
subject.onNext({ type: 'DEC'})
