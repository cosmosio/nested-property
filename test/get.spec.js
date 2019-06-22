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

describe("nested-property.get()", function () {
    describe("Given no value", function () {
        describe("When no value is passed without a path", function () {
            it("Then get returns no value", function () {
                expect(sut.get()).to.be.undefined;
            });
        });

        describe("When no value is passed with a path", function () {
            it("Then get returns no value", function () {
                expect(sut.get(undefined, "a.b")).to.be.undefined;
            });
        });
    });

    describe("Given an empty object", function () {
        let emptyObject = {};

        describe("When the empty object is passed without a path", function () {
            it("Then get returns the empty object", function () {
                expect(sut.get(emptyObject)).to.equal(emptyObject);
            });
        });
    });

    describe("Given an empty array", function () {
        let emptyArray = [];

        describe("When the empty array is passed without a path", function () {
            it("Then get returns the empty array", function () {
                expect(sut.get(emptyArray)).to.equal(emptyArray);
            });
        });
    });

    describe("Given any value", function () {
        describe("When the value is passed without a path", function () {
            let nestedObject;

            beforeEach(function () {
                nestedObject = {
                    b: 1
                }
            });

            it("Then get returns the value", function () {
                expect(sut.get(3)).to.equal(3);
                expect(sut.get("")).to.equal("");
                expect(sut.get(true)).to.equal(true);
                expect(sut.get(null)).to.equal(null);
                expect(sut.get(nestedObject.b)).to.equal(nestedObject.b);
                expect(sut.get("a.b.c.d.e")).to.equal("a.b.c.d.e");
            });
        });

        describe("When a primitive value is passed with a path", function () {
            let nestedObject;

            beforeEach(function () {
                nestedObject = {
                    b: 1
                }
            });

            it("Then get returns the primitive value", function () {
                expect(sut.get(3, "a.b")).to.equal(3);
                expect(sut.get("", "a.b")).to.equal("");
                expect(sut.get(true, "a.b")).to.equal(true);
                expect(sut.get(null, "a.b")).to.equal(null);
                expect(sut.get(nestedObject.b, "b.c")).to.equal(nestedObject.b);
                expect(sut.get("a.b.c.d.e")).to.equal("a.b.c.d.e");
            });
        });
    });

    describe("Given a nested object", function () {
        let nestedObject;

        beforeEach(function () {
            nestedObject = {
                b: {
                    c: {
                        d: {
                            e: 1
                        }
                    }
                }
            };
        });

        describe("When the nested object is passed with a path", function () {
            it("Then get returns the value at that location", function () {
                expect(sut.get(nestedObject, "b")).to.equal(nestedObject.b);
                expect(sut.get(nestedObject, "b.c")).to.equal(nestedObject.b.c);
                expect(sut.get(nestedObject, "b.c.d.e")).to.equal(1);
            });
        });

        describe("When the nested object is passed with a path that doesn't resolve", function () {
            it("Then get returns no value", function () {
                expect(sut.get(nestedObject, "b.e")).to.be.undefined;
                expect(sut.get(nestedObject, "b.c.f")).to.be.undefined;
                expect(sut.get(nestedObject, "b.z")).to.be.undefined;
            });
        });
    });

    describe("Given a nested array", function () {
        let nestedArray;

        beforeEach(function () {
            nestedArray = [
                {
                    c: {
                        d: 10
                    }
                }
            ]
        });

        describe("When the nested array is passed without a path", function () {
            describe("Then get returns he nested array", function () {
                expect(sut.get(nestedArray)).to.equal(nestedArray);
            });
        });

        describe("When the nested array is passed with a path", function () {
            it("Then get returns the value at that location", function () {
                expect(sut.get(nestedArray, 0)).to.equal(nestedArray[0]);
                expect(sut.get(nestedArray, "0.c.d")).to.equal(10);
            });
        });

        describe("When the nested array is passed with a path that doesn't resolve", function () {
            it("Then get returns the value at that location", function () {
                expect(sut.get(nestedArray, "1.c.d")).to.be.undefined;
            });
        });
    });
});
