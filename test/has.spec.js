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

describe("nested-property.has()", function () {
    describe("Given no value", function () {
        describe("When no value is passed without a path", function () {
            it("Then has returns false", function () {
                expect(sut.has()).to.be.false;
            });
        });

        describe("When no value is passed with a path", function () {
            it("Then has retuns false", function () {
                expect(sut.has(undefined, "a.b")).to.be.false;
            });
        });
    });

    describe("Given a primive value", function () {
        describe("When the primitve value is passed without a path", function () {
            it("Then has returns false", function () {
                expect(sut.has(0)).to.be.false;
                expect(sut.has(1)).to.be.false;
                expect(sut.has(true)).to.be.false;
                expect(sut.has(false)).to.be.false;
                expect(sut.has("")).to.be.false;
                expect(sut.has(null)).to.be.false;
            });
        });

        describe("When the primitve value is passed with a path", function () {
            it("Then has returns false", function () {
                expect(sut.has(0, "b.c")).to.be.false;
                expect(sut.has(1, "b.c")).to.be.false;
                expect(sut.has(true, "b.c")).to.be.false;
                expect(sut.has(false, "b.c")).to.be.false;
                expect(sut.has("", "b.c")).to.be.false;
                expect(sut.has(null, "b.c")).to.be.false;
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
                            e: 1,
                            f: undefined,
                            g: Object.create({
                                h: true
                            })
                        }
                    }
                }
            };
        });

        describe("When the object is passed without a path", function () {
            it("Then has returns false", function () {
                expect(sut.has(nestedObject)).to.be.false;
            });
        });

        describe("When the object is passed with a valid path", function () {
            it("Then has returns true", function () {
                expect(sut.has(nestedObject, "b")).to.be.true;
                expect(sut.has(nestedObject, "b.c")).to.be.true;
                expect(sut.has(nestedObject, "b.c")).to.be.true;
                expect(sut.has(nestedObject, "b.c.d")).to.be.true;
                expect(sut.has(nestedObject, "b.c.d.e")).to.be.true;
            });
        });

        describe("When the object is passed with a path that resolves to an undefined value", function () {
            it("Then has returns true", function () {
                expect(sut.has(nestedObject, "b.c.d.f")).to.be.true;
            });
        });

        describe("When the object is passed with a path that doesn't resolve", function () {
            it("Then has returns false", function () {
                expect(sut.has(nestedObject, "x")).to.be.false;
                expect(sut.has(nestedObject, "b.x")).to.be.false;
                expect(sut.has(nestedObject, "b.c.x")).to.be.false;
                expect(sut.has(nestedObject, "b.c.d.x")).to.be.false;
                expect(sut.has(nestedObject, "b.x.d.e")).to.be.false;
            });
        });

        describe("When the object is passed with a path that navigates through a primitive value", function () {
            it("Then has returns false", function () {
                expect(function () {
                    expect(sut.has(nestedObject, "b.c.d.e.h")).to.be.false;
                }).not.to.throw();
            });
        });

        describe("When the object is passed with a path that resolves to a value in the prototype", function () {
            it("Then has returns true", function () {
                expect(sut.has(nestedObject, "b.c.d.g.h")).to.be.true;
            });

            describe("And then own option is set", function () {
                it("Then has returns false", function () {
                    expect(sut.has(nestedObject, "b.c.d.g.h", {own: true})).to.be.false;
                });
            });
        });
    });

    describe("Given a nested array", function () {
        let nestedArray;

        beforeEach(function () {
            nestedArray = [
                {
                    b: [
                        { 
                            c: 1
                        },
                        {
                            d: 2
                        }
                    ]
                }
            ];
        });

        describe("When the array is passed with a path that resolves", function () {
            it("Then has returns true", function () {
                expect(sut.has(nestedArray, 0)).to.be.true;
                expect(sut.has(nestedArray, "0")).to.be.true;
                expect(sut.has(nestedArray, "0.b")).to.be.true;
                expect(sut.has(nestedArray, "0.b.0")).to.be.true;
                expect(sut.has(nestedArray, "0.b.1")).to.be.true;
            });
        });

        describe("When the array is passed with a path that doesn't", function () {
            it("Then has returns false", function () {
                expect(sut.has(nestedArray, 1)).to.be.false;
                expect(sut.has(nestedArray, "0.x")).to.be.false;
                expect(sut.has(nestedArray, "1.b")).to.be.false;
                expect(sut.has(nestedArray, "1.b")).to.be.false;
            });
        });
    });
});