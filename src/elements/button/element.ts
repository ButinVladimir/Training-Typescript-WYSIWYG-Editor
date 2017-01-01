import { Dispatcher } from "../../dispatcher";
import { IStyleRepository } from "../../storages/style-repository";
import { IElement, BaseElement, IElementView, IElementWorkView, IStylesWrapper, StylesWrapper } from "../base";
import { ElementsTypes,
         StylesTypes,
         EVENT_SELECTED,
         EVENT_COPIED,
         EVENT_PASTED,
         EVENT_DELETED,
         EVENT_EDITED } from "../../consts";
import { ButtonWorkView } from "./work-view";
import { ButtonRenderView } from "./render-view";

const supportedTypesIds: ElementsTypes[] = [
];

const supportedStylesIds: StylesTypes[] = [
    StylesTypes.paddingTop,
    StylesTypes.paddingRight,
    StylesTypes.paddingBottom,
    StylesTypes.paddingLeft,
    StylesTypes.borderWidth,
    StylesTypes.borderStyle,
    StylesTypes.borderColor,
    StylesTypes.backgroundColor,
    StylesTypes.width,
    StylesTypes.height,
    StylesTypes.textAlign,
    StylesTypes.fontSize,
    StylesTypes.fontWeight,
    StylesTypes.fontStyle,
    StylesTypes.textDecoration,
    StylesTypes.textColor
];

const defaultStyles: StylesWrapper = new StylesWrapper();
defaultStyles.set(StylesTypes.paddingTop, "5px");
defaultStyles.set(StylesTypes.paddingRight, "5px");
defaultStyles.set(StylesTypes.paddingBottom, "5px");
defaultStyles.set(StylesTypes.paddingLeft, "5px");
defaultStyles.set(StylesTypes.borderWidth, "1px");
defaultStyles.set(StylesTypes.borderStyle, "solid");
defaultStyles.set(StylesTypes.borderColor, "#000000");
defaultStyles.set(StylesTypes.backgroundColor, "#ffffff");
defaultStyles.set(StylesTypes.width, "auto");
defaultStyles.set(StylesTypes.height, "auto");
defaultStyles.set(StylesTypes.textAlign, "center");
defaultStyles.set(StylesTypes.fontSize, "14px");
defaultStyles.set(StylesTypes.fontWeight, "normal");
defaultStyles.set(StylesTypes.fontStyle, "normal");
defaultStyles.set(StylesTypes.textDecoration, "none");
defaultStyles.set(StylesTypes.textColor, "#000000");

const defaultText: string = "Caption";

export class ButtonElement extends BaseElement {
    private _workView: ButtonWorkView;
    private _text: string;

    constructor(
        dispatcher: Dispatcher,
        styleRepository: IStyleRepository,
        id: string) {
        super(dispatcher, styleRepository, id);

        this._workView = new ButtonWorkView("Button " + this.id);
        this._workView.on(EVENT_SELECTED, () => this.onSelect());
        this._workView.on(EVENT_COPIED, () => this.onCopy());
        this._workView.on(EVENT_PASTED, () => this.onPaste());
        this._workView.on(EVENT_DELETED, () => this.onDelete());
        this._workView.on(EVENT_EDITED, () => this.onEdit());
        this.initWorkView();

        this.text = defaultText;
    }

    public getTypeId(): ElementsTypes {
        return ElementsTypes.button;
    }

    public getSupportedTypesIds(): ElementsTypes[] {
        return supportedTypesIds;
    }

    public getSupportedStylesIds(): StylesTypes[] {
        return supportedStylesIds;
    }

    public getWorkView(): IElementWorkView {
        return this._workView;
    }

    public getRenderView(): IElementView {
        const renderView = new ButtonRenderView();

        renderView.updateChildren(this.children.map((childElement: IElement) => childElement.getRenderView()));
        renderView.applyStyles(this.styleRepository, this.styles);
        renderView.text = this.text;

        return renderView;
    }

    public getDefaultStyles(): IStylesWrapper {
        return defaultStyles;
    }

    public get text(): string {
        return this._text;
    }

    public set text(value: string) {
        this._text = value;
        this._workView.text = value;
    }
}
