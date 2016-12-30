import * as $ from "jquery";
import "bootstrap/dist/js/bootstrap.min";
import { Dispatcher } from "./dispatcher";
import { IEditor, Editor } from "./editor";
import { IRenderForm, RenderForm } from "./forms/render-form";
import { IAddForm, AddForm } from "./forms/add-form";
import { IWorkViewport, WorkViewport } from "./forms/work-viewport";
import { IPreviewViewport, PreviewViewport } from "./forms/preview-viewport";
import { IElementFactoryRepository, ElementFactoryRepository } from "./storages/element-factory-repository";
import { IElementRepository, ElementRepository } from "./storages/element-repository";
import { ElementsTypes, StylesTypes } from "./consts";

import { ContainerElementFactory } from "./elements/container";
import { RowElementFactory } from "./elements/row";

require("bootstrap/dist/css/bootstrap.min.css");
require("./style.css");

const dispatcher: Dispatcher = new Dispatcher();
const elementFactoryRepository: IElementFactoryRepository = new ElementFactoryRepository();
const elementRepository: IElementRepository = new ElementRepository();

const renderForm: IRenderForm = new RenderForm();
const addForm: IAddForm = new AddForm(dispatcher, elementFactoryRepository);
const workViewport: IWorkViewport = new WorkViewport(dispatcher);
const previewViewport: IPreviewViewport = new PreviewViewport();

elementFactoryRepository.set(ElementsTypes.container, new ContainerElementFactory(dispatcher, elementRepository));
elementFactoryRepository.set(ElementsTypes.row, new RowElementFactory(dispatcher, elementRepository));

const editor: IEditor = new Editor(
        dispatcher,
        renderForm,
        addForm,
        workViewport,
        previewViewport,
        elementFactoryRepository,
        elementRepository
    );

$("body").append(editor.$element);