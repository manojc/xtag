import { get } from "request";
import { xTaggerEvent, getXTagger } from "./index";

export const sampleXmls = {
    sample1Mb: "https://raw.githubusercontent.com/manojc/xtag/gh-pages/demo/1mb.xml",
    sample2Mb: "https://raw.githubusercontent.com/manojc/xtag/gh-pages/demo/2mb.xml",
    sample5Mb: "https://raw.githubusercontent.com/manojc/xtag/gh-pages/demo/5mb.xml",
    sample23Mb: "https://raw.githubusercontent.com/manojc/xtag/gh-pages/demo/23mb.xml",
    foodMenu: "https://raw.githubusercontent.com/manojc/xtag/gh-pages/demo/food-menu.xml"
}

xTaggerEvent.once("xtagger", (response: any) => console.log(response));
get(sampleXmls.foodMenu).pipe(getXTagger());