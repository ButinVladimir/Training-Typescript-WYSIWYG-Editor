import { Dispatcher } from "../../dispatcher";
import { ElementsTypes } from "../../consts";
import { BaseElementFactory } from "../base";
import { IElementRepository } from "../../storages/element-repository";
import { IStyleRepository } from "../../storages/style-repository";
import { ImageElement } from "./element";

const title: string = "Image";

export class ImageElementFactory extends BaseElementFactory {
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
        return ElementsTypes.image;
    }

    public createElement(): ImageElement {
        const id = this.elementRepository.getElementId();
        const element = new ImageElement(this.dispatcher, this.styleRepository, id);

        return element;
    }

    public copyElement(element: ImageElement): ImageElement {
        const newElement: ImageElement = <ImageElement> super.copyElement(element);

        newElement.src = element.src;

        return newElement;
    }
}