/**
* @license nested-property https://github.com/cosmosio/nested-property
*
* The MIT License (MIT)
*
* Copyright (c) 2014-2020 Olivier Scherrer <pode.fr@gmail.com>
*/
const chai = require("chai");
const sinon = require("sinon");

const expect = chai.expect;

const sut = require("../index");

describe("nested-property.hasOwn()", function () {
    describe("Given nested-property.has()", function () {
        let obj, prop, spyFunc;

        beforeEach(function () {
            spyFunc = sinon.spy(sut, "has");
        });

        describe("When hasOwn() is called", function () {
            beforeEach(function () {
                obj = {};
                prop = "prop";
        
                sut.hasOwn(obj, prop);
            });

            it("Then should call has with the own option set to true", function () {
                expect(sut.has.calledWith(obj, prop, {
                    own: true
                })).to.be.true;
            });
        });

        afterEach(function () {
            spyFunc.restore();
        });
    });
});
