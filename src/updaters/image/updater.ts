import { ImageElement } from "../../elements/image";
import { IUpdater, IUpdaterView } from "../base";
import { ImageUpdaterView } from "./updater-view";

export class ImageUpdater implements IUpdater {
    private _view: ImageUpdaterView;

    constructor() {
        this._view = new ImageUpdaterView();
    }

    public getView(): ImageUpdaterView {
        return this._view;
    }

    public getElementValues(element: ImageElement): void {
        this._view.src = element.src;
    }

    public setElementValues(element: ImageElement): void {
        element.src = this._view.src;
    }
}