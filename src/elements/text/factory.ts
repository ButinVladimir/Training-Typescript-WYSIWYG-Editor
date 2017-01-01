import { Dispatcher } from "../../dispatcher";
import { ElementsTypes } from "../../consts";
import { BaseElementFactory } from "../base";
import { IElementRepository } from "../../storages/element-repository";
import { IStyleRepository } from "../../storages/style-repository";
import { TextElement } from "./element";

const title: string = "Text";

export class TextElementFactory extends BaseElementFactory {
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
        return ElementsTypes.text;
    }

    public createElement(): TextElement {
        const id = this.elementRepository.getElementId();
        const element = new TextElement(this.dispatcher, this.styleRepository, id);

        return element;
    }

    public copyElement(element: TextElement): TextElement {
        const newElement: TextElement = <TextElement> super.copyElement(element);

        newElement.text = element.text;

        return newElement;
    }
}