import * as $ from "jquery";
import { Dispatcher } from "../dispatcher";
import { ElementsTypes, StylesTypes, EVENT_SELECTED, EVENT_DESELECTED, EVENT_ADDED, EVENT_STYLE_UPDATED, EVENT_PREVIEW, EVENT_WORK } from "../consts";
import { IRenderForm } from "../forms/render-form";
import { IAddForm } from "../forms/add-form";
import { IStyleForm } from "../forms/style-form";
import { IWorkViewport } from "../forms/work-viewport";
import { IPreviewViewport } from "../forms/preview-viewport";
import { IElementFactoryRepository } from "../storages/element-factory-repository";
import { IElementRepository } from "../storages/element-repository";
import { IElement, IStylesWrapper } from "../elements/base";

const template: string = require("./template.html");

export interface IEditor {
    readonly $element: JQuery;
}

export class Editor implements IEditor {
    public readonly $element: JQuery;
    private _container: IElement;
    private _selected: IElement | undefined;

    constructor(
        private _dispatcher: Dispatcher,
        private _renderForm: IRenderForm,
        private _addForm: IAddForm,
        private _styleForm: IStyleForm,
        private _workViewport: IWorkViewport,
        private _previewViewport: IPreviewViewport,
        private _elementFactoryRepository: IElementFactoryRepository,
        private _elementRepository: IElementRepository) {
        this.$element = $(template);

        this.$element.find("#top-menu").prepend(this._renderForm.$element);
        this.$element.find("#top-menu").append(this._addForm.$element);
        this.$element.find("#side-panel-content").append(this._styleForm.$element);
        this.$element.find("#work-viewport").append(this._workViewport.$element);
        this.$element.filter("#preview-viewport").append(this._previewViewport.$element);

        this._container = this._elementFactoryRepository.get(ElementsTypes.container).createElement();
        this._workViewport.setContainer(this._container);

        this._dispatcher.on(EVENT_SELECTED, (element: IElement): void => this.onSelect(element));
        this._dispatcher.on(EVENT_DESELECTED, (): void => this.onDeselect());
        this._dispatcher.on(EVENT_ADDED, (elementType: ElementsTypes): void => this.onAdd(elementType));
        this._dispatcher.on(EVENT_STYLE_UPDATED, (stylesWrapper: IStylesWrapper): void => this.onStyleUpdate(stylesWrapper));
        this._dispatcher.on(EVENT_PREVIEW, (): void => this.onPreview());
        this._dispatcher.on(EVENT_WORK, (): void => this.onWork());
    }

    private onSelect(element: IElement): void {
        if (this._selected) {
            this._selected.getWorkView().deselect();
        }

        this._selected = element;

        if (element) {
            element.getWorkView().select();
        }
    }

    private onDeselect(): void {
        if (this._selected) {
            this._selected.getWorkView().deselect();
        }

        this._selected = undefined;
    }

    private onAdd(elementType: ElementsTypes): void {
        if (this._selected && this._selected.supportElement(elementType)) {
            this._elementFactoryRepository.get(elementType).addElement(this._selected);
        }
    }

    private onStyleUpdate(stylesWrapper: IStylesWrapper) {
        if (this._selected) {
            this._selected.applyStyles(stylesWrapper);
        }
    }

    private onPreview() {
        this.$element.filter("#main-container").addClass("hidden");
        this._previewViewport.render(this._container.getRenderView());
        this._previewViewport.show();
    }

    private onWork() {
        this.$element.filter("#main-container").removeClass("hidden");
        this._previewViewport.empty();
        this._previewViewport.hide();
    }
}
