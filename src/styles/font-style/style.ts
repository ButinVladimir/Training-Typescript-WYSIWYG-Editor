import { BaseSelectStyle, IStyleView } from "../base";
import { FontStyleStyleView } from "./style-view";

const cssStyle: string = "font-style";
const options: any = {
    "normal": "Normal",
    "italic": "Italic",
    "oblique": "Oblique",
};
const optionsKeys = Object.getOwnPropertyNames(options);

export class FontStyleStyle extends BaseSelectStyle {
    private _view: FontStyleStyleView;

    constructor() {
        super();

        this._view = new FontStyleStyleView(options);
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