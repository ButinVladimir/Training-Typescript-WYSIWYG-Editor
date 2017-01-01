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
import { TextWorkView } from "./work-view";
import { TextRenderView } from "./render-view";

const supportedTypesIds: ElementsTypes[] = [
];

const supportedStylesIds: StylesTypes[] = [
    StylesTypes.textAlign,
    StylesTypes.fontSize,
    StylesTypes.fontWeight,
    StylesTypes.fontStyle,
    StylesTypes.textDecoration,
    StylesTypes.textColor
];

const defaultStyles: StylesWrapper = new StylesWrapper();
defaultStyles.set(StylesTypes.textAlign, "left");
defaultStyles.set(StylesTypes.fontSize, "14px");
defaultStyles.set(StylesTypes.fontWeight, "normal");
defaultStyles.set(StylesTypes.fontStyle, "normal");
defaultStyles.set(StylesTypes.textDecoration, "none");
defaultStyles.set(StylesTypes.textColor, "#000000");

const defaultText: string = "Insert text value";

export class TextElement extends BaseElement {
    private _workView: TextWorkView;
    private _text: string;

    constructor(
        dispatcher: Dispatcher,
        styleRepository: IStyleRepository,
        id: string) {
        super(dispatcher, styleRepository, id);

        this._workView = new TextWorkView("Text " + this.id);
        this._workView.on(EVENT_SELECTED, () => this.onSelect());
        this._workView.on(EVENT_COPIED, () => this.onCopy());
        this._workView.on(EVENT_PASTED, () => this.onPaste());
        this._workView.on(EVENT_DELETED, () => this.onDelete());
        this._workView.on(EVENT_EDITED, () => this.onEdit());
        this.initWorkView();

        this.text = defaultText;
    }

    public getTypeId(): ElementsTypes {
        return ElementsTypes.text;
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
        const renderView = new TextRenderView();

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
