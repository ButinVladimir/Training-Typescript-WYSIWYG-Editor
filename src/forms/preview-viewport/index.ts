import * as $ from "jquery";
import { IElementView } from "../../elements/base";

const template: string = require("./template.html");

export interface IPreviewViewport {
    readonly $element: JQuery;

    show(): void;
    hide(): void;
    empty(): void;
    render(view: IElementView): void;
}

export class PreviewViewport implements IPreviewViewport {
    public readonly $element: JQuery;

    constructor() {
        this.$element = $(template);
    }

    public show(): void {
        this.$element.removeClass("hidden");
    }

    public hide(): void {
        this.$element.addClass("hidden");
    }

    public empty(): void {
        this.$element.empty();
    }

    public render(view: IElementView): void {
        this.empty();
        this.$element.append(view.render());
    }
}
