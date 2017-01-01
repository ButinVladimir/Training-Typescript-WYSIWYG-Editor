import { BaseSelectStyle, IStyleView } from "../base";
import { TextAlignStyleView } from "./style-view";

const cssStyle: string = "text-align";
const options: any = {
    "left": "Left",
    "center": "Center",
    "right": "Right",
    "justify": "Justify"
};
const optionsKeys = Object.getOwnPropertyNames(options);

export class TextAlignStyle extends BaseSelectStyle {
    private _view: TextAlignStyleView;

    constructor() {
        super();

        this._view = new TextAlignStyleView(options);
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