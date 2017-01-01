import * as $ from "jquery";
import { IElementView, ElementRenderView, IStylesWrapper, applyStylesArray } from "../base";
import { StylesTypes } from "../../consts";
import { IStyleRepository } from "../../storages/style-repository";

const template = require("./template");

export class ButtonRenderView extends ElementRenderView {
    constructor() {
        super();
        this.$element = $(template);
    }

    public updateChildren(childrenView: IElementView[]): void {
    }

    public applyStyles(styleRepository: IStyleRepository, stylesWrapper: IStylesWrapper): void {
        applyStylesArray(styleRepository, stylesWrapper, this.$element.children("button"), [
                StylesTypes.paddingTop,
                StylesTypes.paddingRight,
                StylesTypes.paddingBottom,
                StylesTypes.paddingLeft,
                StylesTypes.borderWidth,
                StylesTypes.borderStyle,
                StylesTypes.borderColor,
                StylesTypes.backgroundColor,
                StylesTypes.width,
                StylesTypes.height,
                StylesTypes.textAlign,
                StylesTypes.fontSize,
                StylesTypes.fontWeight,
                StylesTypes.fontStyle,
                StylesTypes.textDecoration,
                StylesTypes.textColor
            ]);
    }

    public set text(value: string) {
        this.$element.children("button").text(value);
    }
}