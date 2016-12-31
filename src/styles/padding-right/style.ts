import { BaseSizeStyle, IStyleView } from "../base";
import { PaddingRightStyleView } from "./style-view";

const cssStyle: string = "padding-right";

export class PaddingRightStyle extends BaseSizeStyle {
    private _view: PaddingRightStyleView;

    constructor() {
        super();

        this._view = new PaddingRightStyleView();
    }

    public getView(): IStyleView {
        return this._view;
    }

    protected getCssStyle(): string {
        return cssStyle;
    }
}