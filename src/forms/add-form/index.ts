import * as $ from "jquery";
import { Dispatcher } from "../../dispatcher";
import { ElementsTypes, EVENT_SELECTED, EVENT_DESELECTED } from "../../consts";
import { IElementFactoryRepository } from "../../storages/element-factory-repository";
import { IElement } from "../../elements/base";

const template: string = require("./template.html");

export interface IAddForm {
    readonly $element: JQuery;
}

export class AddForm implements IAddForm {
    public readonly $element: JQuery;

    constructor(
        private _dispatcher: Dispatcher,
        private _elementFactoryRepository: IElementFactoryRepository) {
        this.$element = $(template);

        this._dispatcher.on(EVENT_SELECTED, (element: IElement) => this.onSelect(element));
        this._dispatcher.on(EVENT_DESELECTED, () => this.onDeselect());

        const self: AddForm = this;
        this.$element.find("#add-btn-list").on("click", "a", function(e: JQueryEventObject) {
            e.preventDefault();
            e.stopPropagation();

            self.onAdd($(this));
        });
    }

    private onSelect(element: IElement) {
        const $btnList = this.$element.find("#add-btn-list");
        $btnList.empty();

        element.getSupportedTypesIds().forEach((typeId: ElementsTypes) => {
            const $a = $("<a>", {
                text: this._elementFactoryRepository.get(typeId).getTitle(),
                href: "#",
                "data-type": typeId
            });
            const $li = $("<li>");

            $li.append($a);
            $btnList.append($li);
        });
    }

    private onDeselect() {
        this.$element.find("#add-btn-list").empty();
    }

    private onAdd($li: JQuery) {
        this._dispatcher.onAdd($li.data("type"));
    }
}
