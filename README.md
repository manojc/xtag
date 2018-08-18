# xtagger

> Coming Soon!

A simple node package based on [sax](https://www.npmjs.com/package/sax) to get the XML structure of xml file using streams!

Simply do **`npm i xtagger --save`** to install the package.

## Example

### Typescript

```javascript
import { createReadStream } from "fs";
import { getXTagger, xTaggerEvent } from "xtagger";

xTaggerEvent.once("xtagger", (response: any) => console.log(response));
createReadStream("file-path").pipe(getXTagger());
```

### Javascript

```javascript
const fs = require("fs");
const xtagger = require("../index");

xtagger.xTaggerEvent.once("xtagger", (response: any) => console.log(response));
fs.createReadStream("file-path").pipe(xtagger.getXTagger());
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

```json
```