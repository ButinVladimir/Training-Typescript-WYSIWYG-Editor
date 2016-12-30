import { StylesTypes } from "../../consts";

export interface IStylesWrapper {
    get(styleId: StylesTypes): string;
    set(styleId: StylesTypes, styleValue: string): void;
}

export class StylesWrapper implements IStylesWrapper {
    private _styles: any;

    constructor() {
        this._styles = {};
    }

    public get(styleId: StylesTypes): string {
        if (!(styleId in this._styles)) {
            throw new Error("Style id " + styleId + " is missing in wrapper");
        }

        return this._styles[styleId];
    }

    public set(styleId: StylesTypes, styleValue: string): void {
        this._styles[styleId] = styleValue;
    }
}