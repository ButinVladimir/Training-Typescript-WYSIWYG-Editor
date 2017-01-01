import { LinkElement } from "../../elements/link";
import { IUpdater, IUpdaterView } from "../base";
import { LinkUpdaterView } from "./updater-view";

export class LinkUpdater implements IUpdater {
    private _view: LinkUpdaterView;

    constructor() {
        this._view = new LinkUpdaterView();
    }

    public getView(): LinkUpdaterView {
        return this._view;
    }

    public getElementValues(element: LinkElement): void {
        this._view.href = element.href;
    }

    public setElementValues(element: LinkElement): void {
        element.href = this._view.href;
    }
}