'use strict';

const app = require('../app.js');
const chai = require('chai');
const expect = chai.expect;
let event, context;

describe('Tests index', function () {
    it('verifies successful response', async function() {
        const result = await app.lambdaHandler(event, context)

        expect(result).to.equal(undefined);
    });
});
