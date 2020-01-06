/**
* @license nested-property https://github.com/cosmosio/nested-property
*
* The MIT License (MIT)
*
* Copyright (c) 2014-2020 Olivier Scherrer <pode.fr@gmail.com>
*/
const chai = require("chai");
const expect = chai.expect;

const sut = require("../index");

describe("nested-property.get()", function () {
    describe("Given an undefined value", function () {
        describe("When calling get() without a path", function () {
            it("Then returns undefined", function () {
                expect(sut.get()).to.be.undefined;
            });
        });

        describe("When calling get() with a path", function () {
            it("Then returns undefined", function () {
                expect(sut.get(undefined, "a.b")).to.be.undefined;
            });
        });
    });

    describe("Given a number", function () {
        describe("When calling get() without a path", function () {
            it("Then returns the number", function () {
                expect(sut.get(10)).to.equal(10);
            });
        });

        describe("When calling get() with a path", function () {
            it("Then returns the number", function () {
                expect(sut.get(10, "a.b")).to.equal(10);
            });
        });
    });

    describe("Given a string", function () {
        describe("When calling get() without a path", function () {
            it("Then returns the string", function () {
                expect(sut.get("string")).to.equal("string");
            });
        });
    });

    describe("Given null", function () {
        describe("When calling get() without a path", function () {
            it("Then returns null", function () {
                expect(sut.get(null)).to.equal(null);
            });
        });
    });

    describe("Given an empty array", function () {
        describe("When calling get() without a path", function () {
            let emptyArray = [];

            it("Then returns the empty array", function () {
                expect(sut.get(emptyArray)).to.eql(emptyArray);
            });
        });

        describe("When calling get() with a path that doesn't resolve", function () {
            let emptyArray = [];

            it("Then returns undefined", function () {
                expect(sut.get(emptyArray, "a.b")).to.be.undefined;
            });
        });
    });

    describe("Given an empty object", function () {
        describe("When calling get() without a path", function () {
            let emtpyObject = {};

            it("Then returns the empty object", function () {
                expect(sut.get(emtpyObject)).to.equal(emtpyObject);
            });
        });

        describe("When calling get() with a path that doesn't resolve", function () {
            let value, emtpyObject;

            beforeEach(function () {
                emtpyObject = [];
                value = sut.get(emtpyObject, "a.b");
            });

            it("Then returns undefined", function () {
                expect(value).to.equal(undefined);
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
                            e: 1
                        }
                    }
                }
            };
        });

        describe("When calling get() with a path that resolves", function () {
            it("Then returns the value at that location", function () {
                expect(sut.get(nestedObject, "b")).to.equal(nestedObject.b);
                expect(sut.get(nestedObject, "b.c")).to.equal(nestedObject.b.c);
                expect(sut.get(nestedObject, "b.c.d.e")).to.equal(1);
            });
        });

        describe("When calling get() with a path that doesn't resolve", function () {
            it("Then returns undefined", function () {
                expect(sut.get(nestedObject, "a")).to.be.undefined;
                expect(sut.get(nestedObject, "b.e")).to.be.undefined;
                expect(sut.get(nestedObject, "b.c.f")).to.be.undefined;
                expect(sut.get(nestedObject, "b.d.e.z")).to.be.undefined;
                expect(sut.get(nestedObject, "b.c.d.e.f")).to.be.undefined;
            });
        });
    });

    describe("Given a deep data structure with nested arrays", function () {
        let movies;

        beforeEach(function () {
            movies = [
                {
                    year: 2010,
                    title: "The best movie yet",
                    cast: [
                        "alpha",
                        "beta"
                    ]
                },
                {
                    year: 2015,
                    title: "The worst movie ever",
                    cast: [
                        "fox",
                        "lambda"
                    ]
                },
                {
                    year: 2020,
                    title: "My favorite movie",
                    cast: [
                        "alice"
                    ]
                }
            ];
        });

        describe("When calling get() with a path that resolves", function () {
            it("Then returns the value at that location", function () {
                expect(sut.get(movies, 0)).to.equal(movies[0]);
                expect(sut.get(movies, "0")).to.equal(movies[0]);
                expect(sut.get(movies, "0.year")).to.equal(2010);
                expect(sut.get(movies, "0.cast")).to.equal(movies[0].cast);
                expect(sut.get(movies, "0.cast.0")).to.equal("alpha");
                expect(sut.get(movies, "0.cast.1")).to.equal("beta");
                expect(sut.get(movies, "2.year")).to.equal(2020);
                expect(sut.get(movies, "2.cast.0")).to.equal("alice");
            });
        });

        describe("When calling get() with a path that doesn't resolve", function () {
            it("Then returns undefined", function () {
                expect(sut.get(movies, 3)).to.be.undefined;
                expect(sut.get(movies, "0.reviews")).to.be.undefined;
                expect(sut.get(movies, "0.cast.2")).to.be.undefined;
                expect(sut.get(movies, "2.cast.1.first")).to.be.undefined;
            });
        });

        describe("When calling get() with an array wildcard", function () {
            it("Then returns all items at that location", function () {
                expect(sut.get(movies, "+")).to.eql(movies);
                expect(sut.get(movies, "+.year")).to.eql([2010, 2015, 2020]);
                expect(sut.get(movies, "+.cast.0")).to.eql(["alpha", "fox", "alice"]);
                expect(sut.get(movies, "+.cast.1")).to.eql(["beta", "lambda", undefined]);
                expect(sut.get(movies, "+.cast.+")).to.eql([["alpha", "beta"], ["fox", "lambda"], ["alice"]]);
                expect(sut.get(movies, "0.cast.+")).to.eql(["alpha", "beta"]);
            });
        });
    });
});
