import * as $ from "jquery";
import { IElementView, ElementWorkView, IStylesWrapper, applyStylesArray } from "../base";
import { StylesTypes } from "../../consts";
import { IStyleRepository } from "../../storages/style-repository";

const template = require("./template");

export class ImageWorkView extends ElementWorkView {
    private _src: string;

    constructor(title: string) {
        super(title);

        this.$element.children(".block-content").append(template);
    }

    public updateChildren(childrenView: IElementView[]): void {
    }

    public applyStyles(styleRepository: IStyleRepository, stylesWrapper: IStylesWrapper): void {
        const container = this.$element.children(".block-content").children(".site-image").children("img");

        applyStylesArray(styleRepository, stylesWrapper, container, [
                StylesTypes.borderWidth,
                StylesTypes.borderStyle,
                StylesTypes.borderColor,
                StylesTypes.width,
                StylesTypes.height
            ]);
    }

    public get src(): string {
        return this._src;
    }

    public set src(value: string) {
        this._src = value;
        this.$element.children(".block-content").children(".site-image").children("img").attr("src", this._src);
    }
}