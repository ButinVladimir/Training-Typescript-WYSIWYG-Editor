import * as $ from "jquery";
import { EventEmitter } from "events";
import { StylesTypes,
         EVENT_SELECTED,
         EVENT_COPIED,
         EVENT_PASTED,
         EVENT_DELETED,
         EVENT_EDITED } from "../../consts";
import { IStyleRepository } from "../../storages/style-repository";
import { IStylesWrapper } from "./styles-wrapper";

const blockTemplate = require("./template-block.html");

export interface IElementView {
    render(): JQuery;
    updateChildren(childrenView: IElementView[]): void;
    applyStyles(styleRepository: IStyleRepository, stylesWrapper: IStylesWrapper): void;
}

export interface IElementWorkView extends IElementView {
    toggleCopyButton(enable: boolean): void;
    togglePasteButton(enable: boolean): void;
    toggleDeleteButton(enable: boolean): void;
    toggleEditButton(enable: boolean): void;

    delete(): void;
    deselect(): void;
    select(): void;
}

export abstract class ElementWorkView extends EventEmitter implements IElementWorkView {
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

        const $buttons = this.$element.children(".block-buttons").children(".btn");

        $buttons.filter(".btn-copy").click((e: JQueryEventObject) => {
            e.preventDefault();
            e.stopPropagation();

            this.emit(EVENT_COPIED);
        });
        $buttons.filter(".btn-paste").click((e: JQueryEventObject) => {
            e.preventDefault();
            e.stopPropagation();

            this.emit(EVENT_PASTED);
        });
        $buttons.filter(".btn-delete").click((e: JQueryEventObject) => {
            e.preventDefault();
            e.stopPropagation();

            this.emit(EVENT_DELETED);
        });
        $buttons.filter(".btn-edit").click((e: JQueryEventObject) => {
            e.preventDefault();
            e.stopPropagation();

            this.emit(EVENT_EDITED);
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

    public abstract applyStyles(styleRepository: IStyleRepository, stylesWrapper: IStylesWrapper): void;

    public toggleCopyButton(enable: boolean): void {
        this.$element.children(".block-buttons").children(".btn-copy").toggleClass("hidden", !enable);
    }

    public togglePasteButton(enable: boolean): void {
        this.$element.children(".block-buttons").children(".btn-paste").toggleClass("hidden", !enable);
    }

    public toggleDeleteButton(enable: boolean): void {
        this.$element.children(".block-buttons").children(".btn-delete").toggleClass("hidden", !enable);
    }

    public toggleEditButton(enable: boolean): void {
        this.$element.children(".block-buttons").children(".btn-edit").toggleClass("hidden", !enable);
    }

    public delete(): void {
        this.$element.empty();
    }

    public deselect(): void {
        this.$element.removeClass("selected");
    }

    public select(): void {
        this.$element.addClass("selected");
    }
}

export abstract class ElementRenderView implements IElementView {
    protected $element: JQuery;

    public render(): JQuery {
        return this.$element;
    }

    public updateChildren(childrenView: IElementView[]): void {
        this.$element.empty();

        childrenView.forEach((childView: IElementView) => this.$element.append(childView.render()));
    }

    public abstract applyStyles(styleRepository: IStyleRepository, stylesWrapper: IStylesWrapper): void;
}