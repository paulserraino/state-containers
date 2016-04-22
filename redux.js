var redux = require('redux');

var reducer = function (state, action) {
    switch (action.type) {
        case 'INC': return state + 1;
        case 'DEC': return state - 1;
        default: return state
    }
};

var initialState = 0;

var store = redux.createStore(reducer, initialState);

store.subscribe(() =>
  console.log(store.getState())
)

store.dispatch({ type: 'INC' })
store.dispatch({ type: 'INC' })
store.dispatch({ type: 'DEC' })
