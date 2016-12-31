import { ElementsTypes } from "../../consts";
import { Dispatcher } from "../../dispatcher";
import { IElement } from "./element";
import { IElementRepository } from "../../storages/element-repository";
import { IStyleRepository } from "../../storages/style-repository";

export interface IElementFactory {
    readonly typeId: ElementsTypes;

    getTitle(): string;
    createElement(): IElement;
    addElement(parent: IElement): IElement;
    copyElement(element: IElement): IElement;
}

export abstract class BaseElementFactory implements IElementFactory {
    public readonly typeId: ElementsTypes;

    constructor(
        protected dispatcher: Dispatcher,
        protected elementRepository: IElementRepository,
        protected styleRepository: IStyleRepository) {
    }

    public abstract getTitle(): string;

    public abstract createElement(): IElement;

    public addElement(parent?: IElement): IElement {
        const newElement: IElement = this.createElement();

        newElement.setParent(parent);

        return newElement;
    }

    public copyElement(element: IElement): IElement {
        if (element.getTypeId() !== this.typeId) {
            throw "For copying object factory with type id " + element.getTypeId() + " is needed instead of " + this.typeId;
        }

        const newElement: IElement = this.createElement();

        return newElement;
    }
}