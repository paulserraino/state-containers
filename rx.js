var Rx = require('rx')

var subject = new Rx.Subject()

var incReducer = subject
    .filter(a => a.type === 'INC')
    .map(a => s => s + 1)

var decReducer = subject
    .filter(a => a.type === 'DEC')
    .map(a => s => s - 1)

var store = Rx.Observable
    .merge(incReducer, decReducer)
    .startWith(0)
    .scan((x, f) => f(x))

store.subscribe((s) => {
    console.log(s)
})

subject.onNext({ type: 'INC' })
subject.onNext({ type: 'INC' })
subject.onNext({ type: 'DEC' })
