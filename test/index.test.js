const request = require("request");
const Assert = require("chai").assert;
const xtagger = require("../dist/index");
const sampleXmls = require("../dist/demo").sampleXmls;

describe("XML - ", () => {

    it("should provide structure for valid xml", (done) => {
        const expectedResponse = {
            "breakfast_menu": { "1": 1 },
            "food": { "2": 2 },
            "name": { "3": 2 },
            "price": { "3": 2 },
            "description": { "3": 2 },
            "calories": { "3": 2 }
        };
        xtagger.xTaggerEvent.once("xtagger", (response) => {
            Assert.deepEqual(expectedResponse, response);
            done();
        });
        request.get(sampleXmls.foodMenu).pipe(xtagger.getXTagger());
    });

    it("should throw error on providing invalid xml", (done) => {
        try {
            request.get("").pipe(xtagger.getXTagger());
        } catch (error) {
            done();
        }
    });

});