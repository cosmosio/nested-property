/**
* @license nested-property https://github.com/cosmosio/nested-property
*
* The MIT License (MIT)
*
* Copyright (c) 2014-2019 Olivier Scherrer <pode.fr@gmail.com>
*/
const chai = require("chai");

const expect = chai.expect;

const sut = require("../index");

    describe("nested-property.isIn()", function () {
    describe("Given no value", function () {
        describe("When no value is passed without a path and no value to find", function () {
            it("Then isIn returns false", function () {
                expect(sut.isIn()).to.be.false;
            });
        });
    });

    describe("Given an empty object", function () {
        describe("When an empty object is passed without a path and no value to find", function () {
            it("Then isIn returns false", function () {
                expect(sut.isIn({})).to.be.false;
            });
        });

        describe("When an empty object is passed with an invalid path and undefined", function () {
            it("Then isIn returns true", function () {
                expect(sut.isIn({}, "a.b", undefined)).to.be.true;
                expect(sut.isIn({}, "a.b")).to.be.true;
            });
        });

        describe("When an empty object is passed with an invalid path and any falsy value", function () {
            it("Then isIn returns false", function () {
                expect(sut.isIn({}, "a.b", 0)).to.be.false;
                expect(sut.isIn({}, "a.b", null)).to.be.false;
                expect(sut.isIn({}, "a.b", NaN)).to.be.false;
                expect(sut.isIn({}, "a.b", "")).to.be.false;
            });
        });
    });

    describe("Given a nested object", function () {
        let nestedObject;

        beforeEach(function () {
            nestedObject = {
                b: {
                    c: {
                        d: 1
                    }
                }
            };
        });

        describe("When nested object is passed with a valid path and a value in the path", function () {
            it("Then isIn returns true", function () {
                expect(sut.isIn(nestedObject, "b.c.d", nestedObject)).to.be.true;
                expect(sut.isIn(nestedObject, "b.c.d", nestedObject.b)).to.be.true;
                expect(sut.isIn(nestedObject, "b.c.d", nestedObject.b.c)).to.be.true;
                expect(sut.isIn(nestedObject, "b.c.d", nestedObject.b.c.d)).to.be.true;
            });
        });

        describe("When nested object is passed with an invalid path and a value in the path", function () {
            it("Then isIn returns false", function () {
                expect(sut.isIn(nestedObject, "x.c", nestedObject.b)).to.be.false;
                expect(sut.isIn(nestedObject, "b.x.d", nestedObject.b.c)).to.be.false;
                expect(sut.isIn(nestedObject, "b.c.x", nestedObject.b.c.d)).to.be.false;
            });
        });

        describe("When nested object is passed with an invalid path but a value in the path", function () {
            it("Then isIn returns true", function () {
                expect(sut.isIn(nestedObject, "x.c.d", nestedObject)).to.be.true;
                expect(sut.isIn(nestedObject, "b.x.d", nestedObject.b)).to.be.true;
                expect(sut.isIn(nestedObject, "b.c.x", nestedObject.b.c)).to.be.true;
                expect(sut.isIn(nestedObject, "b.c.d.x", nestedObject.b.c.d)).to.be.true;
            });

            describe("And a valid path is required", function () {
                it("Then isIn returns false", function () {
                    expect(sut.isIn(nestedObject, "x.c.d", nestedObject, { validPath: true })).to.be.false;
                    expect(sut.isIn(nestedObject, "b.x.d", nestedObject.b, { validPath: true })).to.be.false;
                    expect(sut.isIn(nestedObject, "b.c.x", nestedObject.b.c, { validPath: true })).to.be.false;
                    expect(sut.isIn(nestedObject, "b.c.d.x", nestedObject.b.c.d, { validPath: true })).to.be.false;
                });
            });
        });
    });

    describe("Given a nested array", function () {
        let nestedArray;

        beforeEach(function () {
            nestedArray = [
                {
                    c: {
                        d: 1
                    }
                }
            ];
        });

        describe("When nested array is passed with an invalid path and undefined", function () {
            it("Then returns true", function () {
                expect(sut.isIn(nestedArray, "0.b.c")).to.be.true;
            });
        });

        describe("When nested array is passed with a valid path and the value at that location", function () {
            it("Then returns true", function () {
                expect(sut.isIn(nestedArray, "0", nestedArray[0])).to.be.true;
                expect(sut.isIn(nestedArray, "0.c", nestedArray[0].c)).to.be.true;
                expect(sut.isIn(nestedArray, "0.c.d", nestedArray[0].c.d)).to.be.true;
                expect(sut.isIn(nestedArray, "0.c.d", nestedArray[0].c.d)).to.be.true;
            });
        });

        describe("When nested array is passed with an invalid path and a value in the path", function () {
            it("Then returns true", function () {
                expect(sut.isIn(nestedArray, "0.x.d", nestedArray[0])).to.be.true
                expect(sut.isIn(nestedArray, "0.c.x", nestedArray[0].c)).to.be.true
                expect(sut.isIn(nestedArray, "0.c.d.x", nestedArray[0].c.d)).to.be.true
                expect(sut.isIn(nestedArray, "x", nestedArray)).to.be.true
            });

            describe("And a valid path is required", function () {
                it("Then returns false", function () {
                    expect(sut.isIn(nestedArray, "0.x.d", nestedArray[0], { validPath: true })).to.be.false
                    expect(sut.isIn(nestedArray, "0.c.x", nestedArray[0].c, { validPath: true })).to.be.false
                    expect(sut.isIn(nestedArray, "0.c.d.x", nestedArray[0].c.d, { validPath: true })).to.be.false
                    expect(sut.isIn(nestedArray, "x", nestedArray, { validPath: true })).to.be.false
                });
            });
        });
    });
});