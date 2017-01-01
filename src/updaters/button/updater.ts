import { ButtonElement } from "../../elements/button";
import { IUpdater, IUpdaterView } from "../base";
import { ButtonUpdaterView } from "./updater-view";

export class ButtonUpdater implements IUpdater {
    private _view: ButtonUpdaterView;

    constructor() {
        this._view = new ButtonUpdaterView();
    }

    public getView(): ButtonUpdaterView {
        return this._view;
    }

    public getElementValues(element: ButtonElement): void {
        this._view.text = element.text;
    }

    public setElementValues(element: ButtonElement): void {
        element.text = this._view.text;
    }
}