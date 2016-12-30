import { ElementsTypes } from "../../consts";
import { IElementFactory } from "../../elements/base";

export interface IElementFactoryRepository {
    get(type: ElementsTypes): IElementFactory;
    set(type: ElementsTypes, factory: IElementFactory): void;
}

export class ElementFactoryRepository implements IElementFactoryRepository {
    private _factoryMapping: any;

    constructor() {
        this._factoryMapping = {};
    }

    public get(type: ElementsTypes): IElementFactory {
        if (!(type in this._factoryMapping)) {
            throw new Error("Invalid element factory type - " + type);
        }

        return this._factoryMapping[type];
    }

    public set(type: ElementsTypes, factory: IElementFactory): void {
        this._factoryMapping[type] = factory;
    }
}
