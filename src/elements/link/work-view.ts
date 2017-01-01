import * as $ from "jquery";
import { IElementView, ElementWorkView, IStylesWrapper, applyStylesArray } from "../base";
import { StylesTypes } from "../../consts";
import { IStyleRepository } from "../../storages/style-repository";

const template = require("./work-template");

export class LinkWorkView extends ElementWorkView {
    constructor(title: string) {
        super(title);

        this.$element.children(".block-content").append(template);
    }

    public applyStyles(styleRepository: IStyleRepository, stylesWrapper: IStylesWrapper): void {
    }
}