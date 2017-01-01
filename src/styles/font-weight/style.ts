import { BaseSelectStyle, IStyleView } from "../base";
import { FontWeightStyleView } from "./style-view";

const cssStyle: string = "font-weight";
const options: any = {
    "lighter": "Lighter",
    "normal": "Normal",
    "bold": "Bold",
    "bolder": "Bolder",
};
const optionsKeys = Object.getOwnPropertyNames(options);

export class FontWeightStyle extends BaseSelectStyle {
    private _view: FontWeightStyleView;

    constructor() {
        super();

        this._view = new FontWeightStyleView(options);
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