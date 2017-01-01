import { BaseColorStyle, IStyleView } from "../base";
import { TextColorStyleView } from "./style-view";

const cssStyle: string = "color";

export class TextColorStyle extends BaseColorStyle {
    private _view: TextColorStyleView;

    constructor() {
        super();

        this._view = new TextColorStyleView();
    }

    public getView(): IStyleView {
        return this._view;
    }

    protected getCssStyle(): string {
        return cssStyle;
    }
}