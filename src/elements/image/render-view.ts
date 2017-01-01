import * as $ from "jquery";
import { IElementView, ElementRenderView, IStylesWrapper, applyStylesArray } from "../base";
import { StylesTypes } from "../../consts";
import { IStyleRepository } from "../../storages/style-repository";

const template = require("./template");

export class ImageRenderView extends ElementRenderView {
    constructor() {
        super();
        this.$element = $(template);
    }

    public updateChildren(childrenView: IElementView[]): void {
    }

    public applyStyles(styleRepository: IStyleRepository, stylesWrapper: IStylesWrapper): void {
        applyStylesArray(styleRepository, stylesWrapper, this.$element.children("img"), [
                StylesTypes.borderWidth,
                StylesTypes.borderStyle,
                StylesTypes.borderColor,
                StylesTypes.width,
                StylesTypes.height
            ]);
    }

    public set src(value: string) {
        this.$element.children("img").attr("src", value);
    }
}