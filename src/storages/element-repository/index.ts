import { ElementsTypes } from "../../consts";
import { IElement } from "../../elements/base";

const ID_PREFIX = "element_";

export interface IElementRepository {
    get(id: string): IElement;
    getElementId(): string;
    set(element: IElement): void;
    delete(id: string): void;
}

export class ElementRepository implements IElementRepository {
    private _elementMapping: any;
    private _elementCounter: number;

    constructor() {
        this._elementMapping = {};
        this._elementCounter = 0;
    }

    public get(id: string): IElement {
        if (!(id in this._elementMapping)) {
            throw new Error("Object with id " + id + " is missing");
        }

        return this._elementMapping[id];
    }

    public getElementId(): string {
        this._elementCounter++;
        return ID_PREFIX + this._elementCounter;
    }

    public set(element: IElement): void {
        if (element.id in this._elementMapping) {
            throw new Error("Object with id " + element.id + "is already existing");
        }

        this._elementMapping[element.id] = element;
    }

    public delete(id: string): void {
        if (id in this._elementMapping) {
            delete this._elementMapping[id];
        }
    }
}
