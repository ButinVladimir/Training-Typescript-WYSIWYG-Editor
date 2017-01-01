import { EventEmitter } from "events";
import { ElementsTypes,
         EVENT_SELECTED,
         EVENT_DESELECTED,
         EVENT_ADDED,
         EVENT_STYLE_UPDATED,
         EVENT_PREVIEW,
         EVENT_WORK,
         EVENT_COPIED,
         EVENT_PASTED,
         EVENT_DELETED,
         EVENT_EDITED,
         EVENT_UPDATED,
         EVENT_SAVED } from "../consts";
import { IElement, IStylesWrapper } from "../elements/base";
import { IUpdater } from "../updaters/base";

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

    public onStyleUpdate(stylesWrapper: IStylesWrapper) {
        this.emit(EVENT_STYLE_UPDATED, stylesWrapper);
    }

    public onPreview() {
        this.emit(EVENT_PREVIEW);
    }

    public onWork() {
        this.emit(EVENT_WORK);
    }

    public onCopy() {
        this.emit(EVENT_COPIED);
    }

    public onPaste() {
        this.emit(EVENT_PASTED);
    }

    public onDelete() {
        this.emit(EVENT_DELETED);
    }

    public onEdit() {
        this.emit(EVENT_EDITED);
    }

    public onUpdate(updater: IUpdater) {
        this.emit(EVENT_UPDATED, updater);
    }

    public onSave() {
        this.emit(EVENT_SAVED);
    }
}