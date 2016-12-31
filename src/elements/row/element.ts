import { Dispatcher } from "../../dispatcher";
import { IStyleRepository } from "../../storages/style-repository";
import { IElement, BaseElement, IElementView, ElementWorkView, IStylesWrapper, StylesWrapper } from "../base";
import { ElementsTypes, StylesTypes, EVENT_SELECTED } from "../../consts";
import { RowWorkView } from "./work-view";
import { RowRenderView } from "./render-view";

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

export class RowElement extends BaseElement {
    private _workView: RowWorkView;

    constructor(
        dispatcher: Dispatcher,
        styleRepository: IStyleRepository,
        id: string) {
        super(dispatcher, styleRepository, id);

        this._workView = new RowWorkView("Row " + this.id);
        this._workView.applyStyles(this.styleRepository, this.styles);
        this._workView.on(EVENT_SELECTED, () => this.onSelect());
    }

    public getTypeId(): ElementsTypes {
        return ElementsTypes.row;
    }

    public getSupportedTypesIds(): ElementsTypes[] {
        return supportedTypesIds;
    }

    public getSupportedStylesIds(): StylesTypes[] {
        return supportedStylesIds;
    }

    public getWorkView(): ElementWorkView {
        return this._workView;
    }

    public getRenderView(): IElementView {
        const renderView = new RowRenderView();

        renderView.updateChildren(this.children.map((childElement: IElement) => childElement.getRenderView()));
        renderView.applyStyles(this.styleRepository, this.styles);

        return renderView;
    }

    public getDefaultStyles(): IStylesWrapper {
        return defaultStyles;
    }
}
