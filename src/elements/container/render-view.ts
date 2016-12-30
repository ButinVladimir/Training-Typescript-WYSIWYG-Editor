import * as $ from "jquery";
import { IElementView, IStylesWrapper } from "../base";
import { StylesTypes } from "../../consts";

const template = require("./template");

export class ContainerRenderView implements IElementView {
    private _$element: JQuery;

    constructor() {
        this._$element = $(template);
    }

    public render(): JQuery {
        return this._$element;
    }

    public updateChildren(childrenView: IElementView[]): void {
    }

    public applyStyles(stylesWrapper: IStylesWrapper): void {
    }
}