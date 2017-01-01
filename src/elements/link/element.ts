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
import { LinkWorkView } from "./work-view";
import { LinkRenderView } from "./render-view";

const supportedTypesIds: ElementsTypes[] = [
    ElementsTypes.text,
    ElementsTypes.image
];

const supportedStylesIds: StylesTypes[] = [
];

const defaultStyles: StylesWrapper = new StylesWrapper();

const defaultHref: string = "https://google.com";

export class LinkElement extends BaseElement {
    private _workView: LinkWorkView;
    private _href: string;

    constructor(
        dispatcher: Dispatcher,
        styleRepository: IStyleRepository,
        id: string) {
        super(dispatcher, styleRepository, id);

        this._workView = new LinkWorkView("Link " + this.id);
        this._workView.on(EVENT_SELECTED, () => this.onSelect());
        this._workView.on(EVENT_COPIED, () => this.onCopy());
        this._workView.on(EVENT_PASTED, () => this.onPaste());
        this._workView.on(EVENT_DELETED, () => this.onDelete());
        this._workView.on(EVENT_EDITED, () => this.onEdit());
        this.initWorkView();

        this.href = defaultHref;
    }

    public getTypeId(): ElementsTypes {
        return ElementsTypes.link;
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
        const renderView = new LinkRenderView();

        renderView.updateChildren(this.children.map((childElement: IElement) => childElement.getRenderView()));
        renderView.applyStyles(this.styleRepository, this.styles);
        renderView.href = this.href;

        return renderView;
    }

    public getDefaultStyles(): IStylesWrapper {
        return defaultStyles;
    }

    public get href(): string {
        return this._href;
    }

    public set href(value: string) {
        this._href = value;
    }
}
