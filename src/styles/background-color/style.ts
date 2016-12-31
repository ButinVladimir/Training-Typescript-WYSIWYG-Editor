import { BaseColorStyle, IStyleView } from "../base";
import { BackgroundColorStyleView } from "./style-view";

const cssStyle: string = "background-color";

export class BackgroundColorStyle extends BaseColorStyle {
    private _view: BackgroundColorStyleView;

    constructor() {
        super();

        this._view = new BackgroundColorStyleView();
    }

    public getView(): IStyleView {
        return this._view;
    }

    protected getCssStyle(): string {
        return cssStyle;
    }
}