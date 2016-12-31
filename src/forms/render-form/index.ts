import * as $ from "jquery";
import { Dispatcher } from "../../dispatcher";

const template: string = require("./template.html");

export interface IRenderForm {
    readonly $element: JQuery;
    setPreview(preview: boolean): void;
}

export class RenderForm implements IRenderForm {
    public readonly $element: JQuery;

    private _isPreview: boolean;

    constructor(
        private _dispatcher: Dispatcher) {
        this.$element = $(template);
        this._isPreview = false;

        this.$element.find("#preview-btn").click((e: JQueryEventObject) => {
            e.preventDefault();

            this.onPreviewBtnClick();
        });
    }

    public setPreview(preview: boolean): void {
        this._isPreview = preview;
    }

    private onPreviewBtnClick() {
        this._isPreview = !this._isPreview;
        if (this._isPreview) {
            this._dispatcher.onPreview();
        } else {
            this._dispatcher.onWork();
        }
    }
}
