import { BaseSizeStyle, IStyleView } from "../base";
import { PaddingBottomStyleView } from "./style-view";

const cssStyle: string = "padding-bottom";

export class PaddingBottomStyle extends BaseSizeStyle {
    private _view: PaddingBottomStyleView;

    constructor() {
        super();

        this._view = new PaddingBottomStyleView();
    }

    public getView(): IStyleView {
        return this._view;
    }

    protected getCssStyle(): string {
        return cssStyle;
    }
}