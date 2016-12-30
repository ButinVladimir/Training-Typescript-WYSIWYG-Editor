import { Dispatcher } from "../../dispatcher";
import { IElement, BaseElement, IElementView, ElementWorkView } from "../base";
import { ElementsTypes, StylesTypes, EVENT_SELECTED } from "../../consts";
import { ContainerWorkView } from "./work-view";
import { ContainerRenderView } from "./render-view";

const supportedTypesIds: ElementsTypes[] = [
    ElementsTypes.row
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

export class ContainerElement extends BaseElement {
    private _workView: ContainerWorkView;

    constructor(
        dispatcher: Dispatcher,
        id: string) {
        super(dispatcher, id);

        this.supportedTypesIds = supportedTypesIds;
        this.supportedStylesIds = supportedStylesIds;

        this._workView = new ContainerWorkView("Container " + this.id);
        this._workView.on(EVENT_SELECTED, () => this.onSelect());
    }

    public getTypeId(): ElementsTypes {
        return ElementsTypes.container;
    }

    public getWorkView(): ElementWorkView {
        return this._workView;
    }

    public getRenderView(): IElementView {
        const renderView = new ContainerRenderView();

        renderView.updateChildren(this.children.map((childElement: IElement) => childElement.getRenderView()));

        return renderView;
    }
}
