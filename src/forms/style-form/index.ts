import * as $ from "jquery";
import { Dispatcher } from "../../dispatcher";
import { StylesTypes, EVENT_SELECTED, EVENT_DESELECTED } from "../../consts";
import { IStyleRepository } from "../../storages/style-repository";
import { IElement, IStylesWrapper } from "../../elements/base";
import { IStyle, IStyleView } from "../../styles/base";

const template: string = require("./template.html");

export interface IStyleForm {
    readonly $element: JQuery;
}

export class StyleForm implements IStyleForm {
    private _stylesIds: StylesTypes[];
    private _styles: IStylesWrapper;
    public readonly $element: JQuery;

    constructor(
        private _dispatcher: Dispatcher,
        private _styleRepository: IStyleRepository) {
        this.$element = $(template);

        this._dispatcher.on(EVENT_SELECTED, (element: IElement) => this.onSelect(element));
        this._dispatcher.on(EVENT_DESELECTED, () => this.onDeselect());

        this.$element.on("submit", (e: JQueryEventObject) => {
            e.preventDefault();
            e.stopPropagation();

            this.onStyleUpdate();
        });
    }

    private onSelect(element: IElement): void {
        this.$element.removeClass("hidden");

        const $inputContainer: JQuery = this.$element.children("#style-inputs");
        $inputContainer.children().detach();

        this._stylesIds = element.getSupportedStylesIds();
        this._styles = element.getStyles();

        for (let i = 0; i < this._stylesIds.length; i++) {
            const styleView: IStyleView = this._styleRepository.get(this._stylesIds[i]).getView();
            styleView.setValue(this._styles.get(this._stylesIds[i]));
            $inputContainer.append(styleView.render());
        }
    }

    private onDeselect(): void {
        this.$element.addClass("hidden");
        this.$element.children("#style-inputs").children().detach();
        this._stylesIds = [];
    }

    private onStyleUpdate(): void {
        for (let i = 0; i < this._stylesIds.length; i++) {
            const style: IStyle = this._styleRepository.get(this._stylesIds[i]);
            const value = style.getViewValue();

            if (!style.validate(value)) {
                alert("Invalid style value " + style.getView().getTitle());
                return;
            }
        }

        for (let i = 0; i < this._stylesIds.length; i++) {
            const style: IStyle = this._styleRepository.get(this._stylesIds[i]);
            const value = style.getViewValue();
            this._styles.set(this._stylesIds[i], value);
        }

        this._dispatcher.onStyleUpdate(this._styles);
    }
}
