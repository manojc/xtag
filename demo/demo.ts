import { createReadStream } from "fs";
import { xTaggerEvent, getXTagger } from "../index";

xTaggerEvent.once("xtagger", (response: any) => console.log(response));
createReadStream(`${__dirname}/food-menu.xml`).pipe(getXTagger());