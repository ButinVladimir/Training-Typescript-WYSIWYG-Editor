import { BaseSizeStyle, IStyleView } from "../base";
import { WidthStyleView } from "./style-view";

const cssStyle: string = "width";

export class WidthStyle extends BaseSizeStyle {
    private _view: WidthStyleView;

    constructor() {
        super();

        this._view = new WidthStyleView();
    }

    public getView(): IStyleView {
        return this._view;
    }

    protected getCssStyle(): string {
        return cssStyle;
    }
}