import { BaseSelectStyle, IStyleView } from "../base";
import { TextDecorationStyleView } from "./style-view";

const cssStyle: string = "text-decoration";
const options: any = {
    "none": "None",
    "line-through": "Line through",
    "overline": "Overline",
    "underline": "Underline",
};
const optionsKeys = Object.getOwnPropertyNames(options);

export class TextDecorationStyle extends BaseSelectStyle {
    private _view: TextDecorationStyleView;

    constructor() {
        super();

        this._view = new TextDecorationStyleView(options);
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