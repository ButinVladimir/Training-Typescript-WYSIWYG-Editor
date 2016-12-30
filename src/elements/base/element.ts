import { EventEmitter } from "events";
import { Dispatcher } from "../../dispatcher";
import { ElementsTypes, StylesTypes, EVENT_SELECTED } from "../../consts";
import { IElementView, ElementWorkView } from "./element-view";

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
    removeChild(childElement: IElement): void;
    getWorkView(): ElementWorkView;
    getRenderView(): IElementView;
    setParent(parent: IElement | undefined): void;

    onSelect(): void;
}

export abstract class BaseElement extends EventEmitter implements IElement {
    public get parent(): IElement | undefined {
        return this._parent;
    }

    public readonly id: string;

    protected children: IElement[];
    protected supportedTypesIds: ElementsTypes[];
    protected supportedStylesIds: StylesTypes[];

    private _parent: IElement | undefined;

    constructor(
        private _dispatcher: Dispatcher,
        id: string) {
        super();

        this.id = id;
        this.children = [];
    }

    public abstract getTypeId(): ElementsTypes;

    public getSupportedTypesIds(): ElementsTypes[] {
        return this.supportedTypesIds;
    }

    public getSupportedStylesIds(): StylesTypes[] {
        return this.supportedStylesIds;
    }

    public supportElement(elementType: ElementsTypes): boolean {
        return this.supportedTypesIds.some((typeId: ElementsTypes) => elementType === typeId);
    }

    public supportStyle(styleType: StylesTypes): boolean {
        return this.supportedStylesIds.some((typeId: StylesTypes) => styleType === typeId);
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

    public removeChild(childElement: IElement): void {
        this.children = this.children.filter((child: IElement) => child !== childElement);
        this.updateChildrenView();
    }

    public abstract getWorkView(): ElementWorkView;

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

    public onSelect(): void {
        this._dispatcher.onSelect(this);
    }

    protected updateChildrenView(): void {
        this.getWorkView().updateChildren(this.children.map((childElement: IElement) => childElement.getWorkView()));
    }
}
