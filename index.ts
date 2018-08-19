import { createStream, SAXStream } from "sax";
import { EventEmitter } from "events";

export const xTaggerEvent: EventEmitter = new EventEmitter();

let structure: { [name: string]: { [hierarchy: number]: number } };
let count: number;

function _onOpenTag(tag: { name: string, attributes: { [key: string]: "" }, isSelfClosing: boolean }): void {
    if (!tag.isSelfClosing) {
        ++count;
    }
    structure[tag.name] = structure[tag.name] || {};
    structure[tag.name][count] = structure[tag.name][count] || 0;
    ++structure[tag.name][count];
}

function _onCloseTag(tagName: string): void {
    --count;
}

function _onError(error: any): void {
    throw error;
}

function _onEnd(): void {
    if (count !== 0) {
        throw new Error("XML parsing failed!");
    }
    xTaggerEvent.emit("xtagger", structure);
}

export function getXTagger(options?: any): SAXStream {
    count = 0;
    structure = {};
    return createStream(options && options.strict, options || {})
        .on("error", _onError)
        .on("opentag", _onOpenTag)
        .on("closetag", _onCloseTag)
        .on("end", _onEnd);
}