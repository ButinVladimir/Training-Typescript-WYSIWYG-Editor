import * as $ from "jquery";
import { Dispatcher } from "../../dispatcher";
import { IElement } from "../../elements/base";
import { IUpdater } from "../../updaters/base";

const template: string = require("./template.html");

export interface IUpdaterForm {
    readonly $element: JQuery;

    startEdit(updater: IUpdater, element: IElement): void;
}

export class UpdaterForm implements IUpdaterForm {
    public readonly $element: JQuery;

    private _updater: IUpdater;

    constructor(
        private _dispatcher: Dispatcher) {
        this.$element = $(template);

        this.$element.find("#modal-save").click((e: JQueryEventObject) => {
            e.preventDefault();

            this.finishEdit();
        });
    }

    public startEdit(updater: IUpdater, element: IElement): void {
        this.$element.modal("show");
        this._updater = updater;
        this._updater.getElementValues(element);

        const $body = this.$element.find(".modal-body");
        $body.children().detach();
        $body.append(this._updater.getView().render());
    }

    public finishEdit(): void {
        this._dispatcher.onUpdate(this._updater);
        this.$element.modal("hide");
    }
}
