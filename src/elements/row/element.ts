import { Dispatcher } from "../../dispatcher";
import { IElement, BaseElement, IElementView, ElementWorkView } from "../base";
import { ElementsTypes, StylesTypes, EVENT_SELECTED } from "../../consts";
import { RowWorkView } from "./work-view";
import { RowRenderView } from "./render-view";

const supportedTypesIds: ElementsTypes[] = [
//    ElementsTypes.column
];
const supportedStylesIds: StylesTypes[] = [
    // StylesTypes.paddingTop,
    // StylesTypes.paddingRight,
    // StylesTypes.paddingBottom,
    // StylesTypes.paddingLeft,
    // StylesTypes.borderWidth,
    // StylesTypes.borderStyle,
    // StylesTypes.borderColor,
    // StylesTypes.backgroundColor,
];

export class RowElement extends BaseElement {
    private _workView: RowWorkView;

    constructor(
        dispatcher: Dispatcher,
        id: string) {
        super(dispatcher, id);

        this.supportedTypesIds = supportedTypesIds;
        this.supportedStylesIds = supportedStylesIds;

        this._workView = new RowWorkView("Row " + this.id);
        this._workView.on(EVENT_SELECTED, () => this.onSelect());
    }

    public getTypeId(): ElementsTypes {
        return ElementsTypes.row;
    }

    public getWorkView(): ElementWorkView {
        return this._workView;
    }

    public getRenderView(): IElementView {
        const renderView = new RowRenderView();

        renderView.updateChildren(this.children.map((childElement: IElement) => childElement.getRenderView()));

        return renderView;
    }
}
