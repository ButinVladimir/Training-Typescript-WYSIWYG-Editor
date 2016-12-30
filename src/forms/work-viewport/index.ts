import * as $ from "jquery";
import { Dispatcher } from "../../dispatcher";
import { IElement } from "../../elements/base";

const template: string = require("./template.html");

export interface IWorkViewport {
    readonly $element: JQuery;
    setContainer(element: IElement): void;
}

export class WorkViewport implements IWorkViewport {
    public readonly $element: JQuery;

    constructor(
        private _dispatcher: Dispatcher
        ) {
        this.$element = $(template);
        this.$element.click((e: JQueryEventObject) => {
            e.preventDefault();
            e.stopPropagation();

            this._dispatcher.onDeselect();
        });
    }

    public setContainer(element: IElement): void {
        this.$element.append(element.getWorkView().render());
    }
}
