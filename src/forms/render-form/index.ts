import * as $ from "jquery";

const template: string = require("./template.html");

export interface IRenderForm {
    readonly $element: JQuery;
}

export class RenderForm implements IRenderForm {
    public readonly $element: JQuery;

    constructor() {
        this.$element = $(template);
    }
}
