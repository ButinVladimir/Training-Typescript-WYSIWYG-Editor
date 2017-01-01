import * as $ from "jquery";
import { ElementRenderView, IStylesWrapper, applyStylesArray } from "../base";
import { StylesTypes } from "../../consts";
import { IStyleRepository } from "../../storages/style-repository";

const template = require("./template");

export class TextRenderView extends ElementRenderView {
    constructor() {
        super();
        this.$element = $(template);
    }

    public applyStyles(styleRepository: IStyleRepository, stylesWrapper: IStylesWrapper): void {
        applyStylesArray(styleRepository, stylesWrapper, this.$element, [
                StylesTypes.textAlign,
                StylesTypes.fontSize,
                StylesTypes.fontWeight,
                StylesTypes.fontStyle,
                StylesTypes.textDecoration,
                StylesTypes.textColor
            ]);
    }

    public set text(value: string) {
        this.$element.text(value);
    }
}