import * as $ from "jquery";

const template: string = require("./template.html");

export interface IPreviewViewport {
    readonly $element: JQuery;
}

export class PreviewViewport implements IPreviewViewport {
    public readonly $element: JQuery;

    constructor() {
        this.$element = $(template);
    }
}
