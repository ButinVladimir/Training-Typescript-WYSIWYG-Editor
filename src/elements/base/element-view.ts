import * as $ from "jquery";
import { EventEmitter } from "events";
import { StylesTypes, EVENT_SELECTED } from "../../consts";
import { IStylesWrapper } from "./styles-wrapper";

const blockTemplate = require("./template-block.html");

export interface IElementView {
    render(): JQuery;
    updateChildren(childrenView: IElementView[]): void;
    applyStyles(stylesWrapper: IStylesWrapper): void;
}

export abstract class ElementWorkView extends EventEmitter implements IElementView {
    protected $element: JQuery;

    constructor(title: string) {
        super();

        this.$element = $(blockTemplate);
        this.$element.children(".block-title").text(title);
        this.$element.click((e: JQueryEventObject) => {
            e.preventDefault();
            e.stopPropagation();

            this.emit(EVENT_SELECTED);
        });
    }

    public render(): JQuery {
        return this.$element;
    }

    public updateChildren(childrenView: IElementView[]): void {
        const childrenContainer: JQuery = this.$element.children(".block-content").children();
        childrenContainer.children().detach();
        childrenView.forEach((childView: IElementView) => childrenContainer.append(childView.render()));
    }

    public abstract applyStyles(stylesWrapper: IStylesWrapper): void;

    public deselect(): void {
        this.$element.removeClass("selected");
    }

    public select(): void {
        this.$element.addClass("selected");
    }
}