import { BaseSizeStyle, IStyleView } from "../base";
import { BorderWidthStyleView } from "./style-view";

const cssStyle: string = "border-width";

export class BorderWidthStyle extends BaseSizeStyle {
    private _view: BorderWidthStyleView;

    constructor() {
        super();

        this._view = new BorderWidthStyleView();
    }

    public getView(): IStyleView {
        return this._view;
    }

    protected getCssStyle(): string {
        return cssStyle;
    }
}