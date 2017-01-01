import { Dispatcher } from "../../dispatcher";
import { IStyleRepository } from "../../storages/style-repository";
import { IElement, BaseElement, IElementView, IElementWorkView, IStylesWrapper, StylesWrapper } from "../base";
import { ElementsTypes,
         StylesTypes,
         EVENT_SELECTED,
         EVENT_COPIED,
         EVENT_PASTED,
         EVENT_DELETED } from "../../consts";
import { ColumnWorkView } from "./work-view";
import { ColumnRenderView } from "./render-view";

const supportedTypesIds: ElementsTypes[] = [
//    ElementsTypes.column
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
    StylesTypes.flexGrow,
    StylesTypes.width,
    StylesTypes.height,
];

const defaultStyles: StylesWrapper = new StylesWrapper();
defaultStyles.set(StylesTypes.paddingTop, "0px");
defaultStyles.set(StylesTypes.paddingRight, "0px");
defaultStyles.set(StylesTypes.paddingBottom, "0px");
defaultStyles.set(StylesTypes.paddingLeft, "0px");
defaultStyles.set(StylesTypes.borderWidth, "0px");
defaultStyles.set(StylesTypes.borderStyle, "none");
defaultStyles.set(StylesTypes.borderColor, "#000000");
defaultStyles.set(StylesTypes.backgroundColor, "#ffffff");
defaultStyles.set(StylesTypes.flexGrow, "0");
defaultStyles.set(StylesTypes.width, "auto");
defaultStyles.set(StylesTypes.height, "auto");

export class ColumnElement extends BaseElement {
    private _workView: ColumnWorkView;

    constructor(
        dispatcher: Dispatcher,
        styleRepository: IStyleRepository,
        id: string) {
        super(dispatcher, styleRepository, id);

        this._workView = new ColumnWorkView("Column " + this.id);
        this._workView.on(EVENT_SELECTED, () => this.onSelect());
        this._workView.on(EVENT_COPIED, () => this.onCopy());
        this._workView.on(EVENT_PASTED, () => this.onPaste());
        this._workView.on(EVENT_DELETED, () => this.onDelete());
        this.initWorkView();
    }

    public getTypeId(): ElementsTypes {
        return ElementsTypes.column;
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
        const renderView = new ColumnRenderView();

        renderView.updateChildren(this.children.map((childElement: IElement) => childElement.getRenderView()));
        renderView.applyStyles(this.styleRepository, this.styles);

        return renderView;
    }

    public getDefaultStyles(): IStylesWrapper {
        return defaultStyles;
    }

    public canBeUpdated(): boolean {
        return false;
    }
}
