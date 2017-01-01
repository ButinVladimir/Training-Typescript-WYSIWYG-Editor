import { BaseSelectStyle, IStyleView } from "../base";
import { AlignItemsStyleView } from "./style-view";

const cssStyle: string = "align-items";
const options: any = {
    "flex-start": "Start",
    "flex-end": "End",
    "center": "Center",
    "baseline": "Baseline",
    "stretch": "Stretch"
};
const optionsKeys = Object.getOwnPropertyNames(options);

export class AlignItemsStyle extends BaseSelectStyle {
    private _view: AlignItemsStyleView;

    constructor() {
        super();

        this._view = new AlignItemsStyleView(options);
    }

    public getView(): IStyleView {
        return this._view;
    }

    protected getCssStyle(): string {
        return cssStyle;
    }

    protected getOptions(): string[] {
        return optionsKeys;
    }
}