"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sax_1 = require("sax");
const events_1 = require("events");
exports.xTaggerEvent = new events_1.EventEmitter();
let structure;
let count;
function _onOpenTag(tag) {
    if (!tag.isSelfClosing) {
        ++count;
    }
    structure[tag.name] = structure[tag.name] || {};
    structure[tag.name][count] = structure[tag.name][count] || 0;
    ++structure[tag.name][count];
}
function _onCloseTag(tagName) {
    --count;
}
function _onError(error) {
    throw error;
}
function _onEnd() {
    if (count !== 0) {
        throw new Error("XML parsing failed!");
    }
    exports.xTaggerEvent.emit("xtagger", structure);
}
function getXTagger(options) {
    count = 0;
    structure = {};
    return sax_1.createStream(true, options || {})
        .on("error", _onError)
        .on("opentag", _onOpenTag)
        .on("closetag", _onCloseTag)
        .on("end", _onEnd);
}
exports.getXTagger = getXTagger;
//# sourceMappingURL=index.js.map