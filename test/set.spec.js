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

describe("nested-property.set()", function () {
    describe("Given an undefined value", function () {
        describe("When calling set() without a path And an undefined value to set", function () {
            it("Then returns undefined", function () {
                expect(sut.set()).to.be.undefined;
            });
        });
    });

    describe("Given a primitive value", function () {
        describe("When calling set() without a path And an undefined value to set", function () {
            it("Then returns the primitive value", function () {
                expect(sut.set("")).to.equal("");
                expect(sut.set(true)).to.equal(true);
                expect(sut.set(null)).to.equal(null);
                expect(sut.set(0)).to.equal(0);
            });
        });
    });

    describe("Given an empty Object", function () {
        let emptyObject;

        beforeEach(function () {
            emptyObject = {};
        });

        describe("When calling set() with a path And a primitive value", function () {
            let result;

            beforeEach(function () {
                result = sut.set(emptyObject, "a", 0);
            });

            it("Then sets the value at that location", function () {
                expect(emptyObject.a).to.equal(0);
            });

            it("Then returns the primitive value", function () {
                expect(result).to.equal(0);
            });
        });

        describe("When calling set() with a deep path And a primitive value", function () {
            let result;

            beforeEach(function () {
                result = sut.set(emptyObject, "a.b.c", 0);
            });

            it("Then sets the value at that location", function () {
                expect(emptyObject.a.b.c).to.equal(0);
            });

            it("Then returns the primitive value", function () {
                expect(result).to.equal(0);
            });
        });

        describe("When calling set() with a deep path And an object", function () {
            let result, anObject;

            beforeEach(function () {
                anObject = {
                    e: {
                        f: 10
                    }
                };

                result = sut.set(emptyObject, "a.b.c.d", anObject);
            });

            it("Then sets the value at that location", function () {
                expect(emptyObject.a.b.c.d.e.f).to.equal(10);
            });

            it("Then returns the object", function () {
                expect(result).to.equal(anObject);
            });
        });

        describe("When calling set() with a deep path And an integer And the path contains an array index", function () {
            let result;

            beforeEach(function () {
                result = sut.set(emptyObject, "a.b.0.d", 20);
            });

            it("Then sets the value at that location", function () {
                expect(emptyObject.a.b[0].d).to.equal(20);
            });

            it("Then returns the primitive value", function () {
                expect(result).to.equal(20);
            });

            it("Then creates an array at the array index position", function () {
                expect(emptyObject.a.b).to.be.an("array");
                expect(emptyObject.a.b.length).to.equal(1);
            });
        });
    });

    describe("Given a complex object", function () {
        let complexObject;

        beforeEach(function () {
            complexObject = {
                a: {
                    b: {
                        c: 1
                    }
                }
            };
        });

        describe("When calling set() with a path that resolves to a proprety in the object", function () {
            let result, anObject;

            beforeEach(function () {
                anObject = {
                    f: {
                        g: 30
                    }
                };
                result = sut.set(complexObject, "a.b", anObject);
            });

            it("Then sets the value at that location", function () {
                expect(complexObject.a.b.f.g).to.equal(30);
            });

            it("Then returns the object", function () {
                expect(result).to.equal(anObject);
            });
        });
    });

    describe("Given a complex array", function () {
        let complexArray;

        beforeEach(function () {
            complexArray = [
                {
                    a: {
                        b: {
                            c: 1
                        }
                    }
                }, {
                    a: [
                        {
                            b: {
                                c: 1
                            }
                        }, {
                            b: {
                                c: 2
                            }
                        }
                    ]
                }
            ];
        });

        describe("When calling set() with a path that resolves to a proprety in the array", function () {
            let result, anObject;

            beforeEach(function () {
                anObject = {
                    f: {
                        g: 30
                    }
                };
                result = sut.set(complexArray, "0.a.b", anObject);
            });

            it("Then sets the value at that location", function () {
                expect(complexArray[0].a.b.f.g).to.equal(30);
            });

            it("Then returns the object", function () {
                expect(result).to.equal(anObject);
            });
        });

        describe("When calling set() with a path that resolves to a deep proprety in the array", function () {
            let result;
            let anObject;

            beforeEach(function () {
                anObject = {
                    f: {
                        g: 30
                    }
                };
                result = sut.set(complexArray, "1.a.1.b", anObject);
            });

            it("Then sets the value at that location", function () {
                expect(complexArray[1].a[1].b.f.g).to.equal(30);
            });

            it("Then returns the object", function () {
                expect(result).to.equal(anObject);
            });
        });

        describe("When calling set() with a path doesn't resolve to a deep proprety in the array", function () {
            let result;
            let anObject;

            beforeEach(function () {
                anObject = {
                    f: {
                        g: 30
                    }
                };
                result = sut.set(complexArray, "2.b.3.c", anObject);
            });

            it("Then creates the value at that location", function () {
                expect(complexArray[2].b[3].c.f.g).to.equal(30);
            });

            it("Then returns the object", function () {
                expect(result).to.equal(anObject);
            });

            it("Then creates an array where an array index appears in the path", function () {
                expect(complexArray[2].b).to.be.an("array");
            });
        });
    });

    describe("Given nested arrays", function () {
        let nestedArray;

        beforeEach(function () {
            nestedArray = [
                {
                    name: "alpha",
                    age: 34,
                    emails: [
                        "alpha-1@alpha.com",
                        "alpha-2@alpha.com"
                    ]
                },
                {
                    name: "bravo",
                    age: 45,
                    emails: [
                        "bravo-1@bravo.com",
                        "bravo-2@bravo.com"
                    ]
                },
                {
                    name: "charlie",
                    age: 64,
                    emails: [
                        "charlie-1@charlie.com",
                        "charlie-2@charlie.com"
                    ]
                },
                {
                    age: 53,
                    emails: [
                        "delta-1@delta.com",
                        "delta-2@delta.com"
                    ]
                }
            ];
        });

        describe("When calling set() on a nested field", function () {
            beforeEach(function () {
                sut.set(nestedArray, "+.name", "<redacted>");
            });

            it("Then sets the matching fields to the new value", function () {
                expect(nestedArray[0].name).to.equal("<redacted>");
                expect(nestedArray[1].name).to.equal("<redacted>");
                expect(nestedArray[2].name).to.equal("<redacted>");
            });

            it("Then doesn't affect the other fields", function () {
                expect(nestedArray[0].age).to.equal(34);
                expect(nestedArray[1].age).to.equal(45);
                expect(nestedArray[2].age).to.equal(64);
            });

            it("Then creates the missing matching fields", function () {
                expect(nestedArray[3].name).to.equal("<redacted>");
            });
        });

        describe("When calling set() on an item nested within a nested array", function () {
            beforeEach(function () {
                sut.set(nestedArray, "+.emails.1", "<redacted>");
            });

            it("Then sets the fields to the new value", function () {
                expect(nestedArray[0].emails[1]).to.equal("<redacted>");
                expect(nestedArray[1].emails[1]).to.equal("<redacted>");
                expect(nestedArray[2].emails[1]).to.equal("<redacted>");
            });

            it("Then doesn't affect the other nested items", function () {
                expect(nestedArray[0].emails[0]).to.equal("alpha-1@alpha.com");
                expect(nestedArray[1].emails[0]).to.equal("bravo-1@bravo.com");
                expect(nestedArray[2].emails[0]).to.equal("charlie-1@charlie.com");
            });
        });

        describe("When calling set() on all items within the nested arrays", function () {
            beforeEach(function () {
                sut.set(nestedArray, "+.emails.+", "<redacted>");
            });

            it("Then sets the fields to the new value", function () {
                expect(nestedArray[0].emails[0]).to.equal("<redacted>");
                expect(nestedArray[0].emails[1]).to.equal("<redacted>");
                expect(nestedArray[1].emails[0]).to.equal("<redacted>");
                expect(nestedArray[1].emails[1]).to.equal("<redacted>");
                expect(nestedArray[2].emails[0]).to.equal("<redacted>");
                expect(nestedArray[2].emails[1]).to.equal("<redacted>");
            });
        });
    });

    describe("Given empty object", function () {
        let emptyObject;

        beforeEach(function () {
            emptyObject = {};
        });

        describe("When calling set() on a nested property using a wildcard", function () {
            beforeEach(function () {
                sut.set(emptyObject, "nestedArray.+", "newValue");
            });

            it("Then creates an empty array", function () {
                expect(emptyObject.nestedArray).to.eql([]);
            });
        });

        describe("When calling set() on a nested property using a wildcard", function () {
            beforeEach(function () {
                sut.set(emptyObject, "nestedArray.+.a", "newValue");
            });

            it("Then creates an empty array", function () {
                expect(emptyObject.nestedArray).to.eql([]);
            });
        });
    });

    describe("When setting a property on an object's prototype", () => {
        let newObj, protoObj;

        beforeEach(function () {
            protoObj = {};
            newObj = Object.create(protoObj);

            sut.set(newObj, "__proto__.a", 1);
        });

        it("Then mutates the prototype", function () {
            expect(protoObj.hasOwnProperty("a")).to.be.true;
        });
    });

    describe("When setting a property on Object.prototype", () => {
        let newObj;

        beforeEach(function () {
            newObj = {};
        });

        it("Then throws an error", function () {
            expect(function () {
                sut.set(newObj, "__proto__.a", 1);
            }).to.throw(sut.ObjectPrototypeMutationError);
        });
    });
});
