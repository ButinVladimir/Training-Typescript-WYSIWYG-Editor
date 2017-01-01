import { BaseSizeStyle, IStyleView } from "../base";
import { FontSizeStyleView } from "./style-view";

const cssStyle: string = "font-size";

export class FontSizeStyle extends BaseSizeStyle {
    private _view: FontSizeStyleView;

    constructor() {
        super();

        this._view = new FontSizeStyleView();
    }

    public getView(): IStyleView {
        return this._view;
    }

    protected getCssStyle(): string {
        return cssStyle;
    }
}