import * as $ from "jquery";
import { ElementWorkView, IStylesWrapper } from "../base";
import { StylesTypes, EVENT_SELECTED } from "../../consts";

const template = require("./template");

export class RowWorkView extends ElementWorkView {
    constructor(title: string) {
        super(title);

        this.$element.children(".block-content").append(template);
    }

    public applyStyles(stylesWrapper: IStylesWrapper): void {
    }
}