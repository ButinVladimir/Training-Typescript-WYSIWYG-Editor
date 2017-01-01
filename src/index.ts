import * as $ from "jquery";
import "bootstrap/dist/js/bootstrap.min";

import { IEditor, Editor } from "./editor";

import { IRenderForm, RenderForm } from "./forms/render-form";
import { IAddForm, AddForm } from "./forms/add-form";
import { IStyleForm, StyleForm } from "./forms/style-form";
import { IUpdaterForm, UpdaterForm } from "./forms/updater-form";
import { IWorkViewport, WorkViewport } from "./forms/work-viewport";
import { IPreviewViewport, PreviewViewport } from "./forms/preview-viewport";

import { Dispatcher } from "./dispatcher";
import { IElementFactoryRepository, ElementFactoryRepository } from "./storages/element-factory-repository";
import { IElementRepository, ElementRepository } from "./storages/element-repository";
import { IStyleRepository, StyleRepository } from "./storages/style-repository";
import { IUpdaterRepository, UpdaterRepository } from "./storages/updater-repository";
import { ElementsTypes, StylesTypes } from "./consts";

import { ContainerElementFactory } from "./elements/container";
import { RowElementFactory } from "./elements/row";
import { ColumnElementFactory } from "./elements/column";
import { TextElementFactory } from "./elements/text";
import { ImageElementFactory } from "./elements/image";
import { ButtonElementFactory } from "./elements/button";
import { LinkElementFactory } from "./elements/link";

import { PaddingTopStyle } from "./styles/padding-top";
import { PaddingRightStyle } from "./styles/padding-right";
import { PaddingBottomStyle } from "./styles/padding-bottom";
import { PaddingLeftStyle } from "./styles/padding-left";
import { BorderWidthStyle } from "./styles/border-width";
import { BorderStyleStyle } from "./styles/border-style";
import { BorderColorStyle } from "./styles/border-color";
import { BackgroundColorStyle } from "./styles/background-color";
import { AlignItemsStyle } from "./styles/align-items";
import { JustifyContentStyle } from "./styles/justify-content";
import { FlexGrowStyle } from "./styles/flex-grow";
import { WidthStyle } from "./styles/width";
import { HeightStyle } from "./styles/height";
import { FontSizeStyle } from "./styles/font-size";
import { FontStyleStyle } from "./styles/font-style";
import { FontWeightStyle } from "./styles/font-weight";
import { TextAlignStyle } from "./styles/text-align";
import { TextColorStyle } from "./styles/text-color";
import { TextDecorationStyle } from "./styles/text-decoration";

import { TextUpdater } from "./updaters/text";
import { ImageUpdater } from "./updaters/image";
import { ButtonUpdater } from "./updaters/button";
import { LinkUpdater } from "./updaters/link";

require("bootstrap/dist/css/bootstrap.min.css");
require("./style.css");

const dispatcher: Dispatcher = new Dispatcher();
const elementFactoryRepository: IElementFactoryRepository = new ElementFactoryRepository();
const elementRepository: IElementRepository = new ElementRepository();
const styleRepository: IStyleRepository = new StyleRepository();
const updaterRepository: IUpdaterRepository = new UpdaterRepository();

const renderForm: IRenderForm = new RenderForm(dispatcher);
const addForm: IAddForm = new AddForm(dispatcher, elementFactoryRepository);
const styleForm: IStyleForm = new StyleForm(dispatcher, styleRepository);
const updaterForm: IUpdaterForm = new UpdaterForm(dispatcher);
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
styleRepository.set(StylesTypes.alignItems, new AlignItemsStyle());
styleRepository.set(StylesTypes.justifyContent, new JustifyContentStyle());
styleRepository.set(StylesTypes.flexGrow, new FlexGrowStyle());
styleRepository.set(StylesTypes.width, new WidthStyle());
styleRepository.set(StylesTypes.height, new HeightStyle());
styleRepository.set(StylesTypes.fontSize, new FontSizeStyle());
styleRepository.set(StylesTypes.fontStyle, new FontStyleStyle());
styleRepository.set(StylesTypes.fontWeight, new FontWeightStyle());
styleRepository.set(StylesTypes.textAlign, new TextAlignStyle());
styleRepository.set(StylesTypes.textColor, new TextColorStyle());
styleRepository.set(StylesTypes.textDecoration, new TextDecorationStyle());

elementFactoryRepository.set(ElementsTypes.container, new ContainerElementFactory(dispatcher, elementRepository, styleRepository));
elementFactoryRepository.set(ElementsTypes.row, new RowElementFactory(dispatcher, elementRepository, styleRepository));
elementFactoryRepository.set(ElementsTypes.column, new ColumnElementFactory(dispatcher, elementRepository, styleRepository));
elementFactoryRepository.set(ElementsTypes.text, new TextElementFactory(dispatcher, elementRepository, styleRepository));
elementFactoryRepository.set(ElementsTypes.image, new ImageElementFactory(dispatcher, elementRepository, styleRepository));
elementFactoryRepository.set(ElementsTypes.button, new ButtonElementFactory(dispatcher, elementRepository, styleRepository));
elementFactoryRepository.set(ElementsTypes.link, new LinkElementFactory(dispatcher, elementRepository, styleRepository));

updaterRepository.set(ElementsTypes.text, new TextUpdater());
updaterRepository.set(ElementsTypes.image, new ImageUpdater());
updaterRepository.set(ElementsTypes.button, new ButtonUpdater());
updaterRepository.set(ElementsTypes.link, new LinkUpdater());

const editor: IEditor = new Editor(
        dispatcher,
        renderForm,
        addForm,
        styleForm,
        updaterForm,
        workViewport,
        previewViewport,
        elementFactoryRepository,
        elementRepository,
        updaterRepository
    );

$("body").append(editor.$element);