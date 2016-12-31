import { Dispatcher } from "../../dispatcher";
import { EVENT_SELECTED } from "../../consts";
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

    public createElement(): IElement {
        const id = this.elementRepository.getElementId();
        const element = new RowElement(this.dispatcher, this.styleRepository, id);

        return element;
    }
}