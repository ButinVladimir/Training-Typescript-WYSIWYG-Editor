import * as $ from "jquery";
import { Dispatcher } from "../../dispatcher";
import { IElement } from "../../elements/base";

const template: string = require("./template.html");

export interface IWorkViewport {
    readonly $element: JQuery;

    show(): void;
    hide(): void;
    setContainer(element: IElement): void;
}

export class WorkViewport implements IWorkViewport {
    public readonly $element: JQuery;

    constructor(
        private _dispatcher: Dispatcher) {
        this.$element = $(template);
    }

    public show(): void {
        this.$element.removeClass("hidden");
    }

    public hide(): void {
        this.$element.addClass("hidden");
    }

    public setContainer(element: IElement): void {
        this.$element.append(element.getWorkView().render());
    }
}
