import { Dispatcher } from "../../dispatcher";
import { ElementsTypes } from "../../consts";
import { BaseElementFactory } from "../base";
import { IElementRepository } from "../../storages/element-repository";
import { IStyleRepository } from "../../storages/style-repository";
import { ContainerElement } from "./element";

const title: string = "Container";

export class ContainerElementFactory extends BaseElementFactory {
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
        return ElementsTypes.container;
    }

    public createElement(): ContainerElement {
        const id = this.elementRepository.getElementId();
        const element = new ContainerElement(this.dispatcher, this.styleRepository, id);

        return element;
    }
}