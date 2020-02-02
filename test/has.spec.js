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

describe("nested-property.has()", function () {
    describe("Given an undefined value", function () {
        describe("When calling has() without a path", function () {
            it("Then returns false", function () {
                expect(sut.has()).to.be.false;
            });
        });

        describe("When calling has() with a path", function () {
            it("Then retuns false", function () {
                expect(sut.has(undefined, "a.b")).to.be.false;
            });
        });
    });

    describe("Given a number", function () {
        describe("When calling has() without a path", function () {
            it("Then returns false", function () {
                expect(sut.has(0)).to.be.false;
            });
        });

        describe("When calling has() with a path", function () {
            it("Then returns false", function () {
                expect(sut.has(0, "b.c")).to.be.false;
            });
        });
    });

    describe("Given a string", function () {
        describe("When calling has() without a path", function () {
            it("Then returns false", function () {
                expect(sut.has("string")).to.be.false;
            });
        });

        describe("When calling has() with a path", function () {
            it("Then returns false", function () {
                expect(sut.has("string", "a.b.c")).to.be.false;
            });
        });
    });

    describe("Given null", function () {
        describe("When calling has() without a path", function () {
            it("Then returns false", function () {
                expect(sut.has(null)).to.be.false;
            });
        });

        describe("When calling has() with a path", function () {
            it("Then returns false", function () {
                expect(sut.has(null, "a.b")).to.be.false;
            });
        });
    });

    describe("Given a deep data structure", function () {
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

        describe("When calling has() with a path that resolves", function () {
            it("Then returns true", function () {
                expect(sut.has(nestedObject, "b")).to.be.true;
                expect(sut.has(nestedObject, "b.c")).to.be.true;
                expect(sut.has(nestedObject, "b.c")).to.be.true;
                expect(sut.has(nestedObject, "b.c.d")).to.be.true;
                expect(sut.has(nestedObject, "b.c.d.e")).to.be.true;
                expect(sut.has(nestedObject, "b.c.d.g")).to.be.true;
                expect(sut.has(nestedObject, "b.c.d.g.h")).to.be.true;
            });
        });

        describe("When calling has() with a path that resolves to an undefined value", function () {
            it("Then has returns true", function () {
                expect(sut.has(nestedObject, "b.c.d.f")).to.be.true;
            });
        });

        describe("When calling has() with a path that doesn't resolve", function () {
            it("Then has returns false", function () {
                expect(sut.has(nestedObject, "x")).to.be.false;
                expect(sut.has(nestedObject, "b.x")).to.be.false;
                expect(sut.has(nestedObject, "b.c.x")).to.be.false;
                expect(sut.has(nestedObject, "b.c.d.x")).to.be.false;
                expect(sut.has(nestedObject, "b.x.d.e")).to.be.false;
                expect(sut.has(nestedObject, "b.c.d.g.e")).to.be.false;
            });
        });

        describe("When calling has() with a path that navigates through a primitive value", function () {
            it("Then has returns false and doesn't throw an error", function () {
                expect(function () {
                    expect(sut.has(nestedObject, "b.c.d.e.h")).to.be.false;
                }).not.to.throw();
            });
        });

        describe("When calling has() with a path that resolves to a value in the prototype", function () {
            it("Then has returns true", function () {
                expect(sut.has(nestedObject, "b.c.d.g.h")).to.be.true;
            });

            describe("And then own option is set", function () {
                it("Then has returns false", function () {
                    expect(sut.has(nestedObject, "b.c.d.g.h", { own: true })).to.be.false;
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
                },
                {
                    b: [
                        { 
                            c: 1
                        },
                        {
                            d: 2
                        },
                        {
                            e: 3
                        }
                    ]
                }
            ];
        });

        describe("When calling has() with a path that resolves", function () {
            it("Then returns true", function () {
                expect(sut.has(nestedArray, 0)).to.be.true;
                expect(sut.has(nestedArray, "0")).to.be.true;
                expect(sut.has(nestedArray, "0.b")).to.be.true;
                expect(sut.has(nestedArray, "0.b.0")).to.be.true;
                expect(sut.has(nestedArray, "0.b.1")).to.be.true;
            });
        });

        describe("When calling has() with a path that doesn't resolve", function () {
            it("Then returns false", function () {
                expect(sut.has(nestedArray, 2)).to.be.false;
                expect(sut.has(nestedArray, "0.x")).to.be.false;
                expect(sut.has(nestedArray, "2.b")).to.be.false;
                expect(sut.has(nestedArray, "+.c")).to.be.false;
                expect(sut.has(nestedArray, "+.b.3")).to.be.false;
                expect(sut.has(nestedArray, "+.b.2.x")).to.be.false;
            });
        });

        describe("When calling has() with a path that resolves and contains an array wildcard", function () {
            it("Then has returns true", function () {
                expect(sut.hasOwn(nestedArray, "0.b.+.d")).to.be.true;
                expect(sut.hasOwn(nestedArray, "0.b.1.d")).to.be.true;
            });
        });

        describe("When calling has() with a path that doesn't resolve and contains an array wildcard", function () {
            it("Then has returns false", function () {
                expect(sut.hasOwn(nestedArray, "0.b.+.f")).to.be.false;
                expect(sut.hasOwn(nestedArray, "0.b.1.f")).to.be.false;
            });
        });

        describe("When callings has() with a path that resolves and contains multiple array wildcards", function () {
            it("Then has returns true", function () {
                expect(sut.hasOwn(nestedArray, "+.b.+.e")).to.be.true;
            });
        });

        describe("When callings has() with a path that doesn't resolve and contains multiple array wildcards", function () {
            it("Then has returns false", function () {
                expect(sut.hasOwn(nestedArray, "+.b.+.f")).to.be.false;
                expect(sut.hasOwn(nestedArray, "+.b.+.e.f")).to.be.false;
            });
        });
    });
});