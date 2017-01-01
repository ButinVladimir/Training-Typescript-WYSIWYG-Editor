import * as $ from "jquery";
import { IElementView, ElementRenderView, IStylesWrapper, applyStylesArray } from "../base";
import { StylesTypes } from "../../consts";
import { IStyleRepository } from "../../storages/style-repository";

const template = require("./template");

export class LinkRenderView extends ElementRenderView {
    constructor() {
        super();
        this.$element = $(template);
    }

    public updateChildren(childrenView: IElementView[]): void {
        const $container = this.$element.children("a");
        $container.empty();

        childrenView.forEach((childView: IElementView) => $container.append(childView.render()));
    }

    public applyStyles(styleRepository: IStyleRepository, stylesWrapper: IStylesWrapper): void {
    }

    public set href(value: string) {
        this.$element.children("a").attr("href", value);
    }
}