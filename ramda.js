var R = require('ramda')
var reduceReducers = require('reduce-reducers')
var Container = require('./ramda-container')

var increment = R.transduce(
    R.filter(a => a.type === 'INC'),
    R.compose(R.add(1))
)

var decrement = R.transduce(
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

module.exports = {
    increment, decrement, subject
};
