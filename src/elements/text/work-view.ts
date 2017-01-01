import * as $ from "jquery";
import { IElementView, ElementWorkView, IStylesWrapper, applyStylesArray } from "../base";
import { StylesTypes } from "../../consts";
import { IStyleRepository } from "../../storages/style-repository";

const template = require("./template");

export class TextWorkView extends ElementWorkView {
    private _text: string;

    constructor(title: string) {
        super(title);

        this.$element.children(".block-content").append(template);
    }

    public updateChildren(childrenView: IElementView[]): void {
    }

    public applyStyles(styleRepository: IStyleRepository, stylesWrapper: IStylesWrapper): void {
        const container = this.$element.children(".block-content").children(".site-text");

        applyStylesArray(styleRepository, stylesWrapper, container, [
                StylesTypes.textAlign,
                StylesTypes.fontSize,
                StylesTypes.fontWeight,
                StylesTypes.fontStyle,
                StylesTypes.textDecoration,
                StylesTypes.textColor
            ]);
    }

    public get text(): string {
        return this._text;
    }

    public set text(value: string) {
        this._text = value;
        this.$element.children(".block-content").children(".site-text").text(this._text);
    }
}