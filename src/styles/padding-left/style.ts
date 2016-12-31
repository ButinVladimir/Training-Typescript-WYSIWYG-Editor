import { BaseSizeStyle, IStyleView } from "../base";
import { PaddingLeftStyleView } from "./style-view";

const cssStyle: string = "padding-left";

export class PaddingLeftStyle extends BaseSizeStyle {
    private _view: PaddingLeftStyleView;

    constructor() {
        super();

        this._view = new PaddingLeftStyleView();
    }

    public getView(): IStyleView {
        return this._view;
    }

    protected getCssStyle(): string {
        return cssStyle;
    }
}