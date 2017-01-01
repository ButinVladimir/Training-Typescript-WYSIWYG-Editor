import * as $ from "jquery";
import { IUpdaterView } from "../base";

const template: string = require("./template.html");

export class ImageUpdaterView implements IUpdaterView {
    private _$element: JQuery;

    constructor() {
        this._$element = $(template);
    }

    public render(): JQuery {
        return this._$element;
    }

    public get src(): string {
        return this.getSrcInput().val();
    }

    public set src(value: string) {
        this.getSrcInput().val(value);
    }

    private getSrcInput(): JQuery {
        return this._$element.find("input[name=src]");
    }
}
