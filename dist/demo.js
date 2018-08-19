"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("request");
const index_1 = require("./index");
exports.sampleXmls = {
    sample1Mb: "https://raw.githubusercontent.com/manojc/xtag/gh-pages/demo/1mb.xml",
    sample2Mb: "https://raw.githubusercontent.com/manojc/xtag/gh-pages/demo/2mb.xml",
    sample5Mb: "https://raw.githubusercontent.com/manojc/xtag/gh-pages/demo/5mb.xml",
    sample23Mb: "https://raw.githubusercontent.com/manojc/xtag/gh-pages/demo/23mb.xml",
    foodMenu: "https://raw.githubusercontent.com/manojc/xtag/gh-pages/demo/food-menu.xml"
};
//default  options for sax stream API
const options = {
    trim: false,
    normalize: false,
    lowercase: false,
    xmlns: false,
    noscript: false,
    position: false
};
index_1.xTaggerEvent.once("xtagger", (response) => console.log(response));
request_1.get(exports.sampleXmls.foodMenu).pipe(index_1.getXTagger(options));
//# sourceMappingURL=demo.js.map