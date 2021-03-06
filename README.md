[![Build Status](https://travis-ci.com/manojc/xtagger.svg?branch=master)](https://travis-ci.com/manojc/xtagger)

# Why [xtagger](https://www.npmjs.com/package/xtagger)?

`xtagger` is a simple node package based on [sax](https://www.npmjs.com/package/sax) to get the XML structure of xml file using streams!

This package is useful in case you want to read a huge xml file in chunks. There are few npm packages like [xml-flow](https://www.npmjs.com/package/xml-flow) & [xml-stream](https://www.npmjs.com/package/xml-stream) which accept a repeating node to parse one xml node at a time using streams. The problem here is - **how to find the appropriate repeating xml node?**

`xtagger` helps you to find the appropriate node as it outputs the xml structure using streams.

Simply do **`npm i xtagger --save`** to install the package.

## APIs

`xtagger` exposes 2 properties -

### **getXTagger(options)**

This property is a `function` that triggers `xtagger.` It returns a `duplex stream` that can be piped with a readbale stream.

`options` manipulates the behavior of xml streamer. Check [sax options](https://www.npmjs.com/package/sax#arguments) for all the details.

### xTaggerEvent: EventEmitter

`xtagger` fires an event after successful data processing. `xTaggerEvent` listens to the fired event & the event handler function provides the generated xml structure.

## Example

### Typescript

```javascript
import { createReadStream } from "fs";
import { getXTagger, xTaggerEvent } from "xtagger";

// options for sax stream API with default values
const options: any = {
    "strict": false,
    "trim": false,
    "normalize": false,
    "lowercase": false,
    "xmlns": false,
    "noscript": false,
    "position": false
};

xTaggerEvent.once("xtagger", (response: any) => console.log(response));
createReadStream("file-path").pipe(getXTagger(options));
```

### Javascript

```javascript
const fs = require("fs");
const xtagger = require("xtagger");

// options for sax stream API with default values
const options = {
    "strict": false,
    "trim": false,
    "normalize": false,
    "lowercase": false,
    "xmlns": false,
    "noscript": false,
    "position": false
};

xtagger.xTaggerEvent.once("xtagger", (response) => console.log(response));
fs.createReadStream("file-path").pipe(xtagger.getXTagger(options));
```

### Sample XML

```xml
<breakfast_menu>
    <food>
        <name>Belgian Waffles</name>
        <price>$5.95</price>
        <description>
            Two of our famous Belgian Waffles with plenty of real maple syrup
        </description>
        <calories>650</calories>
    </food>
    <food>
        <name>Strawberry Belgian Waffles</name>
        <price>$7.95</price>
        <description>
            Light Belgian waffles covered with strawberries and whipped cream
        </description>
        <calories>900</calories>
    </food>
</breakfast_menu>
```

### Output

In case of above `XML`, the output structure would look like -

```javascript
{
    "breakfast_menu": { "1": 1 },
    "food": { "2": 2 },
    "name": { "3": 2 },
    "price": { "3": 2 },
    "description": { "3": 2 },
    "calories": { "3": 2}
}
```

The top level keys represent the tag names. Every `tage name` is an object where key represents the `hierarchy` of the tag in xml strcture whereas value is the count of the `tag name` in the `XML` file.

The generalised structure format looks like this -

```javascript
structure: { [name: string]: { [hierarchy: number]: number } };
```

In case of multiple occurance of the same `tag name` at different hierarchy levels, `tag name` gets following `JSON` structure to provide the distribution of the counts at different hierarchy levels -

```javascript
{
    "breakfast_menu": { "1": 1 },
    "food": { "2": 2 },
    "name": { "3": 2 },
    "price": { "3": 2 },
    "description": { "3": 2, "4": 2 }, // description tag is present at level 3 & 4
    "calories": { "3": 2}
}
```

## Demo

Checkout the [repository](https://github.com/manojc/xtagger). Install dependencies with command **`npm i`** & run **`npm start`** command to start the demo.

## Test

Checkout the [repository](https://github.com/manojc/xtagger). Install dependencies with command **`npm i`** & run **`npm run test`** command to run the tests.

---

- Author - Manoj Chalode ([manojc](https://github.com/manojc))
- Copyright - chalodem@gmail.com
