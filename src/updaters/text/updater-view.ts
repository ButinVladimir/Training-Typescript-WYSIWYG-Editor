import * as $ from "jquery";
import { IUpdaterView } from "../base";

const template: string = require("./template.html");

export class TextUpdaterView implements IUpdaterView {
    private _$element: JQuery;

    constructor() {
        this._$element = $(template);
    }

    public render(): JQuery {
        return this._$element;
    }

    public get text(): string {
        return this.getTextInput().val();
    }

    public set text(value: string) {
        this.getTextInput().val(value);
    }

    private getTextInput(): JQuery {
        return this._$element.find("textarea[name=text]");
    }
}
