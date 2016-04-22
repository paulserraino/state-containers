'use strict';

var expect = require('expect')
var container = require('../ramda')

describe('Ramda Container Actions', () => {

    describe('.increment', () => {
        it('increments a number', () => {
            let state = 0
            let result = container.increment(state, [{ type: 'INC' }])
            expect(result).toEqual(state + 1)
        })
    })

    describe('.decrement', () => {
        it ('decrements a number', () => {
            let state = 1
            let result = container.decrement(state, [{ type: 'DEC' }])
            expect(result).toEqual(state - 1)
        })
    })

})
