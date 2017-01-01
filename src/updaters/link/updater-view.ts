import * as $ from "jquery";
import { IUpdaterView } from "../base";

const template: string = require("./template.html");

export class LinkUpdaterView implements IUpdaterView {
    private _$element: JQuery;

    constructor() {
        this._$element = $(template);
    }

    public render(): JQuery {
        return this._$element;
    }

    public get href(): string {
        return this.getHrefInput().val();
    }

    public set href(value: string) {
        this.getHrefInput().val(value);
    }

    private getHrefInput(): JQuery {
        return this._$element.find("input[name=href]");
    }
}
