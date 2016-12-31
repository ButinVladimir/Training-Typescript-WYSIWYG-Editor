import { BaseColorStyle, IStyleView } from "../base";
import { BorderColorStyleView } from "./style-view";

const cssStyle: string = "border-color";

export class BorderColorStyle extends BaseColorStyle {
    private _view: BorderColorStyleView;

    constructor() {
        super();

        this._view = new BorderColorStyleView();
    }

    public getView(): IStyleView {
        return this._view;
    }

    protected getCssStyle(): string {
        return cssStyle;
    }
}