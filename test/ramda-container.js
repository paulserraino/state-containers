'use strict';

var expect = require('expect')
var Container = require('../ramda-container')
var subject = require('../ramda');

describe('Ramda Container', () => {
    it('exposes the public API', () => {
        const store = new Container();
        const methods = Object.keys(store.__proto__)

        expect(methods.length).toBe(5)
        expect(methods).toContain('initialState')
        expect(methods).toContain('subscribe')
        expect(methods).toContain('reducer')
        expect(methods).toContain('getState')
        expect(methods).toContain('onNext')
    })

    it('applies the reducer to the previous state', () => {
        const store = new Container();
        let state = 0;
        store.initialState(state).reducer(subject.increment)
        store.onNext({ type: 'INC'})
        expect(store.getState()).toEqual(state + 1)
    })

})
