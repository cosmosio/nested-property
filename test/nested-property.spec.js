/**
* @license nested-property https://github.com/cosmosio/nested-property
*
* The MIT License (MIT)
*
* Copyright (c) 2014-2015 Olivier Scherrer <pode.fr@gmail.com>
*/
var sut = require("../index");

var chai = require("chai"),
	expect = chai.expect;

describe("nested-property", function () {
	describe("get", function () {
		var a = {b:{c:{d:{e:1}}}},
			b = [{c:{d:10}}];

		it("should be a function", function () {
			expect(typeof sut.set).to.equal("function");
		});

		it("should return the property value", function () {
			expect(sut.get()).to.be.undefined;
			expect(sut.get("")).to.equal("");
			expect(sut.get("a.b.c.d.e")).to.equal("a.b.c.d.e");
			expect(sut.get(true)).to.equal(true);
			expect(sut.get(null)).to.equal(null);
			expect(sut.get(a)).to.equal(a);
			expect(sut.get(a.b)).to.equal(a.b);
			expect(sut.get(a.b, "")).to.equal(a.b);
			expect(sut.get(a, "b.c")).to.equal(a.b.c);
			expect(sut.get(a, "b.c.d.e")).to.equal(1);
			expect(sut.get(a, "b")).to.equal(a.b);
			expect(sut.get(a, "b.e")).to.be.undefined;
		});

		it("should get the property through an array too", function () {
			expect(sut.get(b, "0.c.d")).to.equal(10);
		});

		it("should work with numbers as property", function () {
			expect(sut.get(b, 0)).to.equal(b[0]);
		});

		it("should return undefined if nested property doesn't exist", function () {
			expect(sut.get(a, "z.x.y")).to.be.undefined;
		});
	});

    describe("has", function () {
        var a = {b:{c:{d:{e:1, f:undefined}}}},
            b = [{c:{d:10}}],
            c = {d:[{e:20}]};

        it("should be a function", function () {
            expect(typeof sut.has).to.equal("function");
        });

        it("should tell if a property is in an object", function () {
            expect(sut.has()).to.be.false;
            expect(sut.has("")).to.be.false;
            expect(sut.has("a.b.c.d.e")).to.be.false;
            expect(sut.has(true)).to.be.false;
            expect(sut.has(null)).to.be.false;
            expect(sut.has(a)).to.be.false;
            expect(sut.has(a.b)).to.be.false;
            expect(sut.has(a.b, "")).to.be.false;
            expect(sut.has(a, "b.c")).to.be.true
            expect(sut.has(a, "b.c.d.e")).to.be.true;
            expect(sut.has(a, "b")).to.be.true;
            expect(sut.has(a, "b.e")).to.be.false;
        });

        it("should return true also if the property is undefined", function () {
            expect(sut.has(a, "b.c.d.f")).to.be.true;
        });

        it("should tell if the property exists through an array too", function () {
            expect(sut.has(b, "0.c.d")).to.be.true;
            expect(sut.has(b, "1.c.d")).to.be.false;
            expect(sut.has(c, "d.0.e")).to.be.true;
            expect(sut.has(c, "d.1.e")).to.be.false;
        });

        it("should work with numbers as property", function () {
            expect(sut.has(b, 0)).to.be.true;
        });

        it("should return false if nested property doesn't exist", function () {
            expect(sut.has(a, "z.x.y")).to.be.false;
        });
    });

	describe("set", function () {

		var a = {b:{c:{d:{e:1}}}},
			b = [{c:{d:10}}];

		it("should be a function", function () {
			expect(typeof sut.set).to.equal("function");
		});

		it("should set the property value", function () {
			var obj = {};
			expect(sut.set()).to.be.undefined;
			expect(sut.set("")).to.equal("");
			expect(sut.set(true)).to.equal(true);
			expect(sut.set(null)).to.equal(null);
			expect(sut.set(a)).to.equal(a);
			expect(sut.set(a, "b.c.d.e", 2)).to.equal(2);
			expect(a.b.c.d.e).to.equal(2);
			expect(sut.set(a, "b.c", obj)).to.equal(obj);
			expect(a.b.c).to.equal(obj);
			expect(sut.set(a, "b", obj)).to.equal(obj);
			expect(a.b).to.equal(obj);
		});

		it("should set the property through an array too", function () {
			expect(sut.set(b, "0.c.d", 20)).to.equal(20);
			expect(b[0].c.d).to.equal(20);
		});

		it("should work with numbers as property", function () {
			expect(sut.set(b, 0, 20)).to.equal(20);
			expect(b[0]).to.equal(20);
		});

		it("should force set if nested property doesn't exist", function () {
			expect(sut.set(a, "z.x.y", 10)).to.equal(10);
			expect(a.z.x.y).to.equal(10);
		});
	});
});
