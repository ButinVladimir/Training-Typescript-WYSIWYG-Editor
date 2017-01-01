import * as $ from "jquery";
import { Dispatcher } from "../dispatcher";
import { ElementsTypes,
         StylesTypes,
         EVENT_SELECTED,
         EVENT_DESELECTED,
         EVENT_ADDED,
         EVENT_STYLE_UPDATED,
         EVENT_PREVIEW,
         EVENT_WORK,
         EVENT_COPIED,
         EVENT_PASTED,
         EVENT_DELETED,
         EVENT_EDITED,
         EVENT_UPDATED } from "../consts";
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
    private _copied: IElement | undefined;
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
        this._selected = undefined;
        this._copied = undefined;

        this.$element = $(template);

        this.$element.find("#top-menu").prepend(this._renderForm.$element);
        this.$element.find("#top-menu").append(this._addForm.$element);
        this.$element.find("#side-panel-content").append(this._styleForm.$element);
        this.$element.find("#work-viewport").append(this._workViewport.$element);
        this.$element.filter("#preview-viewport").append(this._previewViewport.$element);
        this.$element.find("#work-viewport").click((e: JQueryEventObject): void => this._dispatcher.onDeselect());

        this._container = this._elementFactoryRepository.get(ElementsTypes.container).createElement();
        this._workViewport.setContainer(this._container);

        this._dispatcher.on(EVENT_SELECTED, (element: IElement): void => this.onSelect(element));
        this._dispatcher.on(EVENT_DESELECTED, (): void => this.onDeselect());
        this._dispatcher.on(EVENT_ADDED, (elementType: ElementsTypes): void => this.onAdd(elementType));
        this._dispatcher.on(EVENT_STYLE_UPDATED, (stylesWrapper: IStylesWrapper): void => this.onStyleUpdate(stylesWrapper));
        this._dispatcher.on(EVENT_PREVIEW, (): void => this.onPreview());
        this._dispatcher.on(EVENT_WORK, (): void => this.onWork());
        this._dispatcher.on(EVENT_COPIED, (): void => this.onCopy());
        this._dispatcher.on(EVENT_PASTED, (): void => this.onPaste());
        this._dispatcher.on(EVENT_DELETED, (): void => this.onDelete());
        this._dispatcher.on(EVENT_EDITED, (): void => this.onEdit());
        this._dispatcher.on(EVENT_UPDATED, (): void => this.onUpdate());
    }

    private onSelect(element: IElement): void {
        if (this._selected) {
            this._selected.getWorkView().deselect();
        }

        this._selected = element;

        if (element) {
            element.getWorkView().select();
            element.togglePasteButton(!!this._copied && element.supportElement(this._copied.getTypeId()));
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

    private onCopy() {
        if (this._selected && this._selected.canBeCopied()) {
            this._copied = this._selected;
        }
    }

    private onPaste() {
        if (this._selected && this._copied && this._copied.canBeCopied() && this._selected.supportElement(this._copied.getTypeId())) {
            const queue: [IElement, IElement][] = [];
            let currentTuple: [IElement, IElement] | undefined;
            let newChildren: IElement[] = [];

            const childCallback = (child: IElement) => {
                if (currentTuple) {
                    const newChild = this._elementFactoryRepository.get(child.getTypeId()).copyElement(child);
                    newChildren.push(newChild);
                    queue.push([child, newChild]);
                }
            };

            const newRoot: IElement = this._elementFactoryRepository.get(this._copied.getTypeId()).copyElement(this._copied);
            queue.push([this._copied, newRoot]);

            while (queue.length > 0) {
                currentTuple = queue.shift();

                if (currentTuple) {
                    newChildren = [];
                    currentTuple[0].iterateChildren(childCallback);
                    currentTuple[1].appendChildren(newChildren);
                }
            }

            this._selected.appendChild(newRoot);
        }
    }

    private onDelete() {
        if (this._selected && this._selected.canBeDeleted()) {
            const parent = this._selected.parent;
            if (parent) {
                parent.removeChild(this._selected);
            }

            const queue: IElement[] = [];
            const childCallback = (element: IElement) => { queue.push(element); };
            let currentElement: IElement | undefined;
            queue.push(this._selected);

            while (queue.length > 0) {
                currentElement = queue.shift();

                if (currentElement) {
                    currentElement.iterateChildren(childCallback);
                    this._elementRepository.delete(currentElement.id);
                    currentElement.delete();
                }
            }

            this._copied = undefined;
            this._dispatcher.onDeselect();
        }
    }

    private onEdit() {
    }

    private onUpdate() {
    }
}
