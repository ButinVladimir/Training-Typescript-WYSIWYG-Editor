import { EventEmitter } from "events";
import { Dispatcher } from "../../dispatcher";
import { IStyleRepository } from "../../storages/style-repository";
import { ElementsTypes,
         StylesTypes,
         EVENT_SELECTED,
         EVENT_COPIED,
         EVENT_PASTED,
         EVENT_DELETED,
         EVENT_EDITED } from "../../consts";
import { IElementView, IElementWorkView } from "./element-view";
import { IStylesWrapper, StylesWrapper } from "./styles-wrapper";

export type ElementChildCallback = (child: IElement) => any;

export interface IElement {
    parent: IElement | undefined;
    readonly id: string;

    getTypeId(): ElementsTypes;
    getSupportedTypesIds(): ElementsTypes[];
    getSupportedStylesIds(): StylesTypes[];
    supportElement(elementType: ElementsTypes): boolean;
    supportStyle(styleType: StylesTypes): boolean;
    iterateChildren(callback: ElementChildCallback): void;
    appendChild(childElement: IElement): void;
    appendChildren(childElements: IElement[]): void;
    removeChild(childElement: IElement): void;
    getWorkView(): IElementWorkView;
    getRenderView(): IElementView;
    setParent(parent: IElement | undefined): void;
    getDefaultStyles(): IStylesWrapper;
    getStyles(): IStylesWrapper;
    applyStyles(wrapper: IStylesWrapper): void;
    delete(): void;

    canBeCopied(): boolean;
    canBeDeleted(): boolean;
    canBeUpdated(): boolean;
    togglePasteButton(enable: boolean): void;

    onSelect(): void;
    onCopy(): void;
    onPaste(): void;
    onDelete(): void;
    onEdit(): void;
}

export abstract class BaseElement extends EventEmitter implements IElement {
    public get parent(): IElement | undefined {
        return this._parent;
    }

    public readonly id: string;

    protected children: IElement[];
    protected styles: IStylesWrapper;

    private _parent: IElement | undefined;

    constructor(
        private _dispatcher: Dispatcher,
        protected styleRepository: IStyleRepository,
        id: string) {
        super();

        this.id = id;
        this.children = [];
        this.styles = new StylesWrapper();

        const supportedStyles: StylesTypes[] = this.getSupportedStylesIds();
        const defaultStyles: IStylesWrapper = this.getDefaultStyles();
        for (let i = 0; i < supportedStyles.length; i++) {
            this.styles.set(supportedStyles[i], defaultStyles.get(supportedStyles[i]));
        }
    }

    public abstract getTypeId(): ElementsTypes;

    public abstract getSupportedTypesIds(): ElementsTypes[];

    public abstract getSupportedStylesIds(): StylesTypes[];

    public supportElement(elementType: ElementsTypes): boolean {
        return this.getSupportedTypesIds().some((typeId: ElementsTypes) => elementType === typeId);
    }

    public supportStyle(styleType: StylesTypes): boolean {
        return this.getSupportedStylesIds().some((typeId: StylesTypes) => styleType === typeId);
    }

    public iterateChildren(callback: ElementChildCallback): void {
        this.children.forEach(callback);
    }

    public appendChild(childElement: IElement): void {
        if (this.supportElement(childElement.getTypeId())) {
            this.children.push(childElement);
            this.updateChildrenView();
        }
    }

    public appendChildren(childElements: IElement[]): void {
        childElements.forEach((childElement: IElement) => {
            if (this.supportElement(childElement.getTypeId())) {
                this.children.push(childElement);
            }
        });
        this.updateChildrenView();
    }

    public removeChild(childElement: IElement): void {
        this.children = this.children.filter((child: IElement) => child !== childElement);
        this.updateChildrenView();
    }

    public abstract getWorkView(): IElementWorkView;

    public abstract getRenderView(): IElementView;

    public setParent(parent: IElement): void {
        if (!parent || parent.supportElement(this.getTypeId())) {
            if (this._parent) {
                this._parent.removeChild(this);
            }

            this._parent = parent;

            if (this._parent) {
                this._parent.appendChild(this);
            }
        }
    }

    public abstract getDefaultStyles(): IStylesWrapper;

    public getStyles(): IStylesWrapper {
        const stylesWrapper = new StylesWrapper();
        const supportedStyles: StylesTypes[] = this.getSupportedStylesIds();

        for (let i = 0; i < supportedStyles.length; i++) {
            stylesWrapper.set(supportedStyles[i], this.styles.get(supportedStyles[i]));
        }

        return stylesWrapper;
    }

    public applyStyles(stylesWrapper: IStylesWrapper): void {
        const supportedStyles: StylesTypes[] = this.getSupportedStylesIds();

        for (let i = 0; i < supportedStyles.length; i++) {
            this.styles.set(supportedStyles[i], stylesWrapper.get(supportedStyles[i]));
        }

        this.getWorkView().applyStyles(this.styleRepository, this.styles);
    }

    public delete(): void {
        this._parent = undefined;
        this.children = [];
        this.getWorkView().delete();
    }

    public canBeCopied(): boolean {
        return true;
    }

    public canBeDeleted(): boolean {
        return true;
    }

    public canBeUpdated(): boolean {
        return true;
    }

    public togglePasteButton(enable: boolean): void {
        this.getWorkView().togglePasteButton(enable);
    }

    public onSelect(): void {
        this._dispatcher.onSelect(this);
    }

    public onCopy(): void {
        if (this.canBeCopied()) {
            this._dispatcher.onCopy(this);
        }
    }

    public onPaste(): void {
        this._dispatcher.onPaste(this);
    }

    public onDelete(): void {
        if (this.canBeDeleted()) {
            this._dispatcher.onDelete(this);
        }
    }

    public onEdit(): void {
        if (this.canBeUpdated()) {
            this._dispatcher.onEdit(this);
        }
    }

    protected updateChildrenView(): void {
        this.getWorkView().updateChildren(this.children.map((childElement: IElement) => childElement.getWorkView()));
    }

    protected initWorkView(): void {
        this.getWorkView().applyStyles(this.styleRepository, this.styles);
        this.getWorkView().toggleCopyButton(this.canBeCopied());
        this.getWorkView().toggleDeleteButton(this.canBeDeleted());
        this.getWorkView().toggleEditButton(this.canBeUpdated());
    }
}
