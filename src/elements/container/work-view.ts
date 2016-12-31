import * as $ from "jquery";
import { ElementWorkView, IStylesWrapper, applyStylesArray } from "../base";
import { StylesTypes } from "../../consts";
import { IStyleRepository } from "../../storages/style-repository";

const template = require("./template");

export class ContainerWorkView extends ElementWorkView {
    constructor(title: string) {
        super(title);

        this.$element.children(".block-content").append(template);
    }

    public applyStyles(styleRepository: IStyleRepository, stylesWrapper: IStylesWrapper): void {
        const container = this.$element.children(".block-content").children(".site-container");

        applyStylesArray(styleRepository, stylesWrapper, container, [
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