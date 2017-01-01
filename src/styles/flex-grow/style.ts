import { BaseFlexStyle, IStyleView } from "../base";
import { FlexGrowStyleView } from "./style-view";

const cssStyle: string = "flex-grow";

export class FlexGrowStyle extends BaseFlexStyle {
    private _view: FlexGrowStyleView;

    constructor() {
        super();

        this._view = new FlexGrowStyleView();
    }

    public getView(): IStyleView {
        return this._view;
    }

    protected getCssStyle(): string {
        return cssStyle;
    }
}