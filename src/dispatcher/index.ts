import { EventEmitter } from "events";
import { ElementsTypes, EVENT_SELECTED, EVENT_DESELECTED, EVENT_ADDED } from "../consts";
import { IElement } from "../elements/base";

export class Dispatcher extends EventEmitter {
    constructor() {
        super();
    }

    public onSelect(element: IElement): void {
        this.emit(EVENT_SELECTED, element);
    }

    public onDeselect(): void {
        this.emit(EVENT_DESELECTED);
    }

    public onAdd(elementType: ElementsTypes): void {
        this.emit(EVENT_ADDED, elementType);
    }
}