import { Dispatcher } from "../../dispatcher";
import { ElementsTypes } from "../../consts";
import { BaseElementFactory } from "../base";
import { IElementRepository } from "../../storages/element-repository";
import { IStyleRepository } from "../../storages/style-repository";
import { LinkElement } from "./element";

const title: string = "Link";

export class LinkElementFactory extends BaseElementFactory {
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
        return ElementsTypes.link;
    }

    public createElement(): LinkElement {
        const id = this.elementRepository.getElementId();
        const element = new LinkElement(this.dispatcher, this.styleRepository, id);

        return element;
    }

    public copyElement(element: LinkElement): LinkElement {
        const newElement: LinkElement = <LinkElement> super.copyElement(element);

        newElement.href = element.href;

        return newElement;
    }
}