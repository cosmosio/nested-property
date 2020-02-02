/**
* @license nested-property https://github.com/cosmosio/nested-property
*
* The MIT License (MIT)
*
* Copyright (c) 2014-2020 Olivier Scherrer <pode.fr@gmail.com>
*/
const chai = require("chai");

const expect = chai.expect;

const { ENTRYPOINT = "../index" } = process.env;
const sut = require(ENTRYPOINT);

describe("nested-property.isIn()", function () {
    describe("Given an undefined value", function () {
        describe("When calling isIn() without a path And without a value to search for", function () {
            it("Then returns false", function () {
                expect(sut.isIn()).to.be.false;
            });
        });
    });

    describe("Given an empty object", function () {
        describe("When calling isIn() without a path And an undefined value to search for", function () {
            it("Then returns false", function () {
                expect(sut.isIn({})).to.be.false;
            });
        });

        describe("When calling isIn() with a path that doesn't resolve And an undefined value to search for", function () {
            it("Then returns true", function () {
                expect(sut.isIn({}, "a.b", undefined)).to.be.true;
                expect(sut.isIn({}, "a.b")).to.be.true;
            });
        });

        describe("When calling isIn() with a path that doesn't resolve And a falsy value to search for", function () {
            it("Then returns false", function () {
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

        describe("When calling isIn() with a valid path And a value present in the path", function () {
            it("Then returns true", function () {
                expect(sut.isIn(nestedObject, "b.c.d", nestedObject)).to.be.true;
                expect(sut.isIn(nestedObject, "b.c.d", nestedObject.b)).to.be.true;
                expect(sut.isIn(nestedObject, "b.c.d", nestedObject.b.c)).to.be.true;
                expect(sut.isIn(nestedObject, "b.c.d", nestedObject.b.c.d)).to.be.true;
            });
        });

        describe("When calling isIn() with an invalid path And a value in the nested object", function () {
            it("Then returns false", function () {
                expect(sut.isIn(nestedObject, "x.c", nestedObject.b)).to.be.false;
                expect(sut.isIn(nestedObject, "b.x.d", nestedObject.b.c)).to.be.false;
                expect(sut.isIn(nestedObject, "b.c.x", nestedObject.b.c.d)).to.be.false;
            });
        });

        describe("When calling isIn() with an partially valid path And a value present in the valid portion", function () {
            it("Then returns true", function () {
                expect(sut.isIn(nestedObject, "x.c.d", nestedObject)).to.be.true;
                expect(sut.isIn(nestedObject, "b.x.d", nestedObject.b)).to.be.true;
                expect(sut.isIn(nestedObject, "b.c.x", nestedObject.b.c)).to.be.true;
                expect(sut.isIn(nestedObject, "b.c.d.x", nestedObject.b.c.d)).to.be.true;
            });

            describe("When a fully valid path is required", function () {
                it("Then returns false", function () {
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
                        d: 0
                    },
                    e: [
                        { f: 0 },
                        { g: 0 }
                    ]
                },
                {
                    c: {
                        d: 1
                    },
                    e: [
                        { f: 1 },
                        { g: 1 },
                        { h: 1 }
                    ]
                },
                {
                    c: {
                        d: 2
                    },
                    e: [
                        { f: 2 },
                        { g: 2 }
                    ]
                }
            ];
        });

        describe("When calling isIn() with invalid path And an undefined value to search for", function () {
            it("Then returns true", function () {
                expect(sut.isIn(nestedArray, "0.b.c")).to.be.true;
            });

            describe("And a valid path is required", function () {
                it("Then returns false", function () {
                    expect(sut.isIn(nestedArray, "0.b.c", undefined, {
                        validPath: true
                    })).to.be.false;
                });
            });
        });

        describe("When calling isIn() with a valid path And the value at that location", function () {
            it("Then returns true", function () {
                expect(sut.isIn(nestedArray, "0", nestedArray[0])).to.be.true;
                expect(sut.isIn(nestedArray, "0.c", nestedArray[0].c)).to.be.true;
                expect(sut.isIn(nestedArray, "0.c.d", nestedArray[0].c.d)).to.be.true;
                expect(sut.isIn(nestedArray, "0.c.d", nestedArray[0].c.d)).to.be.true;
            });
        });

        describe("When calling isIn() with an partially valid path And a value in the valid portion", function () {
            it("Then returns true", function () {
                expect(sut.isIn(nestedArray, "0.x.d", nestedArray[0])).to.be.true;
                expect(sut.isIn(nestedArray, "0.c.x", nestedArray[0].c)).to.be.true;
                expect(sut.isIn(nestedArray, "0.c.d.x", nestedArray[0].c.d)).to.be.true;
                expect(sut.isIn(nestedArray, "x", nestedArray)).to.be.true;
            });

            describe("And a fully valid path is required", function () {
                it("Then returns false", function () {
                    expect(sut.isIn(nestedArray, "0.x.d", nestedArray[0], { validPath: true })).to.be.false;
                    expect(sut.isIn(nestedArray, "0.c.x", nestedArray[0].c, { validPath: true })).to.be.false;
                    expect(sut.isIn(nestedArray, "0.c.d.x", nestedArray[0].c.d, { validPath: true })).to.be.false;
                    expect(sut.isIn(nestedArray, "x", nestedArray, { validPath: true })).to.be.false;
                });
            });
        });

        describe("When calling isIn() with a valid path using a wildcard and a value at that location", function () {
            it("Then returns true", function () {
                expect(sut.isIn(nestedArray, "+", nestedArray[0])).to.be.true;
                expect(sut.isIn(nestedArray, "+", nestedArray[2])).to.be.true;
                expect(sut.isIn(nestedArray, "+.c", nestedArray[1].c)).to.be.true;
                expect(sut.isIn(nestedArray, "+.e", nestedArray[1].e)).to.be.true;
                expect(sut.isIn(nestedArray, "+.e.+.h", nestedArray[1].e.h)).to.be.true;
            }); 
        });

        describe("When calling isIn() with a partially valid path using a wildcard and a value in the valid portion", function () {
            it("Then returns true", function () {
                expect(sut.isIn(nestedArray, "+.e.r", nestedArray[0])).to.be.true;
                expect(sut.isIn(nestedArray, "+.e.+.h", nestedArray[1].e)).to.be.true;
                expect(sut.isIn(nestedArray, "+.e.+.h.x", nestedArray[1].e.h)).to.be.true;
            });

            describe("When a fully valid path is required", function () {
                it("Then returns false", function () {
                    expect(sut.isIn(nestedArray, "+.e.r", nestedArray[0], { validPath: true })).to.be.false;
                    expect(sut.isIn(nestedArray, "+.e.+.h", nestedArray[1].e, { validPath: true })).to.be.false;
                    expect(sut.isIn(nestedArray, "+.e.+.h.x", nestedArray[1].e.h, { validPath: true })).to.be.false;
                });
            });
        });
    });
});