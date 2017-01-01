import { BaseSelectStyle, IStyleView } from "../base";
import { JustifyContentStyleView } from "./style-view";

const cssStyle: string = "justify-content";
const options: any = {
    "flex-start": "Start",
    "flex-end": "End",
    "center": "Center",
    "space-between": "Space between",
    "space-around": "Space around"
};
const optionsKeys = Object.getOwnPropertyNames(options);

export class JustifyContentStyle extends BaseSelectStyle {
    private _view: JustifyContentStyleView;

    constructor() {
        super();

        this._view = new JustifyContentStyleView(options);
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