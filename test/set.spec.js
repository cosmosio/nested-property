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

describe("nested-property.set()", function () {
    describe("Given no value", function () {
        describe("When no value is passed without a path and no value to set", function () {
            it("Then set returns undefined", function () {
                expect(sut.set()).to.be.undefined;
            });
        });
    });

    describe("Given a primitive value", function () {
        describe("When a primitive value is passed without a path no value to set", function () {
            it("Then set returns the primitive value", function () {
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

        describe("When a path is passed with a primitive value", function () {
            let result;

            beforeEach(function () {
                result = sut.set(emptyObject, "a", 0);
            });

            it("Then sets the value at that location", function () {
                expect(emptyObject.a).to.equal(0);
            });

            it("Then set returns the primitive value", function () {
                expect(result).to.equal(0);
            })
        });

        describe("When a deep path is passed with a primitive value", function () {
            let result;

            beforeEach(function () {
                result = sut.set(emptyObject, "a.b.c", 0);
            });

            it("Then sets the value at that location", function () {
                expect(emptyObject.a.b.c).to.equal(0);
            });

            it("Then set returns the primitive value", function () {
                expect(result).to.equal(0);
            })
        });

        describe("When a deep path is passed with an object", function () {
            let result;
            let anObject;

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

            it("Then set returns the primitive value", function () {
                expect(result).to.equal(anObject);
            });
        });

        describe("When a deep path containing an integer is passed with a primitive value", function () {
            let result;

            beforeEach(function () {
                result = sut.set(emptyObject, "a.b.0.d", 20);
            });

            it("Then sets the value at that location", function () {
                expect(emptyObject.a.b[0].d).to.equal(20);
            });

            it("Then set returns the primitive value", function () {
                expect(result).to.equal(20);
            });

            it("Then set creates an array", function () {
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

        describe("When a path resolves to a proprety in the object", function () {
            let result;
            let anObject;

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

            it("Then set returns the object", function () {
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
                }];
        });

        describe("When a path resolves to a proprety in the array", function () {
            let result;
            let anObject;

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

            it("Then set returns the object", function () {
                expect(result).to.equal(anObject);
            });
        });

        describe("When a path resolves to a deep proprety in the array", function () {
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

            it("Then set returns the object", function () {
                expect(result).to.equal(anObject);
            });
        });

        describe("When a path doesn't resolve to a deep proprety in the array", function () {
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

            it("Then set returns the object", function () {
                expect(result).to.equal(anObject);
            });

            it("Then creates array when integers appear in the path", function () {
                expect(complexArray[2].b).to.be.an("array");
            });
        });
    });
});
