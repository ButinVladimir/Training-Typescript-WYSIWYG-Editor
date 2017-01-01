import * as $ from "jquery";
import { ElementRenderView, IStylesWrapper, applyStylesArray } from "../base";
import { StylesTypes } from "../../consts";
import { IStyleRepository } from "../../storages/style-repository";

const template = require("./template");

export class RowRenderView extends ElementRenderView {
    constructor() {
        super();
        this.$element = $(template);
    }

    public applyStyles(styleRepository: IStyleRepository, stylesWrapper: IStylesWrapper): void {
        applyStylesArray(styleRepository, stylesWrapper, this.$element, [
                StylesTypes.paddingTop,
                StylesTypes.paddingRight,
                StylesTypes.paddingBottom,
                StylesTypes.paddingLeft,
                StylesTypes.borderWidth,
                StylesTypes.borderStyle,
                StylesTypes.borderColor,
                StylesTypes.backgroundColor,
                StylesTypes.alignItems,
                StylesTypes.justifyContent
            ]);
    }
}