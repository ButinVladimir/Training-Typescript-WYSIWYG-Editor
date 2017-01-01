import { TextElement } from "../../elements/text";
import { IUpdater, IUpdaterView } from "../base";
import { TextUpdaterView } from "./updater-view";

export class TextUpdater implements IUpdater {
    private _view: TextUpdaterView;

    constructor() {
        this._view = new TextUpdaterView();
    }

    public getView(): TextUpdaterView {
        return this._view;
    }

    public getElementValues(element: TextElement): void {
        this._view.text = element.text;
    }

    public setElementValues(element: TextElement): void {
        element.text = this._view.text;
    }
}