import * as $ from "jquery";
import { IElementView, IStylesWrapper, applyStylesArray } from "../base";
import { StylesTypes } from "../../consts";
import { IStyleRepository } from "../../storages/style-repository";

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
        this._$element.empty();

        childrenView.forEach((childView: IElementView) => this._$element.append(childView.render()));
    }

    public applyStyles(styleRepository: IStyleRepository, stylesWrapper: IStylesWrapper): void {
        applyStylesArray(styleRepository, stylesWrapper, this._$element, [
                StylesTypes.paddingTop,
                StylesTypes.paddingRight,
                StylesTypes.paddingBottom,
                StylesTypes.paddingLeft,
                StylesTypes.borderWidth,
                StylesTypes.borderStyle,
                StylesTypes.borderColor,
                StylesTypes.backgroundColor,
            ]);
    }
}