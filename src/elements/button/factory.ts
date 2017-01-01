import { Dispatcher } from "../../dispatcher";
import { ElementsTypes } from "../../consts";
import { BaseElementFactory } from "../base";
import { IElementRepository } from "../../storages/element-repository";
import { IStyleRepository } from "../../storages/style-repository";
import { ButtonElement } from "./element";

const title: string = "Button";

export class ButtonElementFactory extends BaseElementFactory {
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
        return ElementsTypes.button;
    }

    public createElement(): ButtonElement {
        const id = this.elementRepository.getElementId();
        const element = new ButtonElement(this.dispatcher, this.styleRepository, id);

        return element;
    }

    public copyElement(element: ButtonElement): ButtonElement {
        const newElement: ButtonElement = <ButtonElement> super.copyElement(element);

        newElement.text = element.text;

        return newElement;
    }
}