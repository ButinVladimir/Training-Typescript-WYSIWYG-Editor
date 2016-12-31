import { BaseSelectStyle, IStyleView } from "../base";
import { BorderStyleStyleView } from "./style-view";

const cssStyle: string = "border-style";
const options: any = {
    "none": "None",
    "dashed": "Dashed",
    "dotted": "Dotted",
    "solid": "Solid"
};
const optionsKeys = Object.getOwnPropertyNames(options);

export class BorderStyleStyle extends BaseSelectStyle {
    private _view: BorderStyleStyleView;

    constructor() {
        super();

        this._view = new BorderStyleStyleView(options);
    }

    public getView(): IStyleView {
        return this._view;
    }

    protected getCssStyle(): string {
        return cssStyle;
    }

    protected getOptions(): string[] {
        return optionsKeys;
    }
}