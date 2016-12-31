import { StylesTypes } from "../../consts";
import { IStyle } from "../../styles/base";

export interface IStyleRepository {
    get(type: StylesTypes): IStyle;
    set(type: StylesTypes, style: IStyle): void;
}

export class StyleRepository implements IStyleRepository {
    private _styleMapping: any;

    constructor() {
        this._styleMapping = {};
    }

    public get(type: StylesTypes): IStyle {
        if (!(type in this._styleMapping)) {
            throw new Error("Invalid style type - " + type);
        }

        return this._styleMapping[type];
    }

    public set(type: StylesTypes, style: IStyle): void {
        this._styleMapping[type] = style;
    }
}
