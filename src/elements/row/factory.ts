import { Dispatcher } from "../../dispatcher";
import { ElementsTypes } from "../../consts";
import { IElement, BaseElementFactory } from "../base";
import { IElementRepository } from "../../storages/element-repository";
import { IStyleRepository } from "../../storages/style-repository";
import { RowElement } from "./element";

const title: string = "Row";

export class RowElementFactory extends BaseElementFactory {
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
        return ElementsTypes.row;
    }

    public createElement(): IElement {
        const id = this.elementRepository.getElementId();
        const element = new RowElement(this.dispatcher, this.styleRepository, id);

        return element;
    }
}