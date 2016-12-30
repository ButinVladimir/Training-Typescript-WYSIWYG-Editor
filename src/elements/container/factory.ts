import { Dispatcher } from "../../dispatcher";
import { EVENT_SELECTED } from "../../consts";
import { IElement, BaseElementFactory } from "../base";
import { IElementRepository } from "../../storages/element-repository";
import { ContainerElement } from "./element";

const title: string = "Container";

export class ContainerElementFactory extends BaseElementFactory {
    constructor(
        dispatcher: Dispatcher,
        elementRepository: IElementRepository) {
        super(dispatcher, elementRepository);
    }

    public getTitle() {
        return title;
    }

    public createElement(): IElement {
        const id = this.elementRepository.getElementId();
        const element = new ContainerElement(this.dispatcher, id);

        return element;
    }
}