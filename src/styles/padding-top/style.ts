import { BaseSizeStyle, IStyleView } from "../base";
import { PaddingTopStyleView } from "./style-view";

const cssStyle: string = "padding-top";

export class PaddingTopStyle extends BaseSizeStyle {
    private _view: PaddingTopStyleView;

    constructor() {
        super();

        this._view = new PaddingTopStyleView();
    }

    public getView(): IStyleView {
        return this._view;
    }

    protected getCssStyle(): string {
        return cssStyle;
    }
}