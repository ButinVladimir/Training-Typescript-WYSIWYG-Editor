import { Dispatcher } from "../../dispatcher";
import { ElementsTypes } from "../../consts";
import { IElement, BaseElementFactory } from "../base";
import { IElementRepository } from "../../storages/element-repository";
import { IStyleRepository } from "../../storages/style-repository";
import { ColumnElement } from "./element";

const title: string = "Column";

export class ColumnElementFactory extends BaseElementFactory {
    constructor(
        dispatcher: Dispatcher,
        elementRepository: IElementRepository,
        styleRepository: IStyleRepository) {
        super(dispatcher, elementRepository, styleRepository);
    }

    public getTitle() {
        return title;
    }

    public getTypeId(): ElementsTypes {
        return ElementsTypes.column;
    }

    public createElement(): IElement {
        const id = this.elementRepository.getElementId();
        const element = new ColumnElement(this.dispatcher, this.styleRepository, id);

        return element;
    }
}