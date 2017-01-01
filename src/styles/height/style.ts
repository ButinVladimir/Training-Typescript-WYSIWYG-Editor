import { BaseSizeStyle, IStyleView } from "../base";
import { HeightStyleView } from "./style-view";

const cssStyle: string = "height";

export class HeightStyle extends BaseSizeStyle {
    private _view: HeightStyleView;

    constructor() {
        super();

        this._view = new HeightStyleView();
    }

    public getView(): IStyleView {
        return this._view;
    }

    protected getCssStyle(): string {
        return cssStyle;
    }
}