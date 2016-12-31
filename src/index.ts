import * as $ from "jquery";
import "bootstrap/dist/js/bootstrap.min";

import { IEditor, Editor } from "./editor";

import { IRenderForm, RenderForm } from "./forms/render-form";
import { IAddForm, AddForm } from "./forms/add-form";
import { IStyleForm, StyleForm } from "./forms/style-form";
import { IWorkViewport, WorkViewport } from "./forms/work-viewport";
import { IPreviewViewport, PreviewViewport } from "./forms/preview-viewport";

import { Dispatcher } from "./dispatcher";
import { IElementFactoryRepository, ElementFactoryRepository } from "./storages/element-factory-repository";
import { IElementRepository, ElementRepository } from "./storages/element-repository";
import { IStyleRepository, StyleRepository } from "./storages/style-repository";
import { ElementsTypes, StylesTypes } from "./consts";

import { ContainerElementFactory } from "./elements/container";
import { RowElementFactory } from "./elements/row";

import { PaddingTopStyle } from "./styles/padding-top";
import { PaddingRightStyle } from "./styles/padding-right";
import { PaddingBottomStyle } from "./styles/padding-bottom";
import { PaddingLeftStyle } from "./styles/padding-left";
import { BorderWidthStyle } from "./styles/border-width";
import { BorderStyleStyle } from "./styles/border-style";
import { BorderColorStyle } from "./styles/border-color";
import { BackgroundColorStyle } from "./styles/background-color";

require("bootstrap/dist/css/bootstrap.min.css");
require("./style.css");

const dispatcher: Dispatcher = new Dispatcher();
const elementFactoryRepository: IElementFactoryRepository = new ElementFactoryRepository();
const elementRepository: IElementRepository = new ElementRepository();
const styleRepository: IStyleRepository = new StyleRepository();

const renderForm: IRenderForm = new RenderForm(dispatcher);
const addForm: IAddForm = new AddForm(dispatcher, elementFactoryRepository);
const styleForm: IStyleForm = new StyleForm(dispatcher, styleRepository);
const workViewport: IWorkViewport = new WorkViewport(dispatcher);
const previewViewport: IPreviewViewport = new PreviewViewport();

styleRepository.set(StylesTypes.paddingTop, new PaddingTopStyle());
styleRepository.set(StylesTypes.paddingRight, new PaddingRightStyle());
styleRepository.set(StylesTypes.paddingBottom, new PaddingBottomStyle());
styleRepository.set(StylesTypes.paddingLeft, new PaddingLeftStyle());
styleRepository.set(StylesTypes.borderWidth, new BorderWidthStyle());
styleRepository.set(StylesTypes.borderStyle, new BorderStyleStyle());
styleRepository.set(StylesTypes.borderColor, new BorderColorStyle());
styleRepository.set(StylesTypes.backgroundColor, new BackgroundColorStyle());

elementFactoryRepository.set(ElementsTypes.container, new ContainerElementFactory(dispatcher, elementRepository, styleRepository));
elementFactoryRepository.set(ElementsTypes.row, new RowElementFactory(dispatcher, elementRepository, styleRepository));

const editor: IEditor = new Editor(
        dispatcher,
        renderForm,
        addForm,
        styleForm,
        workViewport,
        previewViewport,
        elementFactoryRepository,
        elementRepository
    );

$("body").append(editor.$element);