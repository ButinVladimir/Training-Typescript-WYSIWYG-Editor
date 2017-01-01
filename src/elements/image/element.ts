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
import { ImageWorkView } from "./work-view";
import { ImageRenderView } from "./render-view";

const supportedTypesIds: ElementsTypes[] = [
];

const supportedStylesIds: StylesTypes[] = [
    StylesTypes.borderWidth,
    StylesTypes.borderStyle,
    StylesTypes.borderColor,
    StylesTypes.width,
    StylesTypes.height
];

const defaultStyles: StylesWrapper = new StylesWrapper();
defaultStyles.set(StylesTypes.borderWidth, "0px");
defaultStyles.set(StylesTypes.borderStyle, "none");
defaultStyles.set(StylesTypes.borderColor, "transparent");
defaultStyles.set(StylesTypes.width, "auto");
defaultStyles.set(StylesTypes.height, "auto");

const defaultSrc: string = "http://lapku.ru/images/42487/kak-uzanat-pochemu-krichit-kotenok.jpg";

export class ImageElement extends BaseElement {
    private _workView: ImageWorkView;
    private _src: string;

    constructor(
        dispatcher: Dispatcher,
        styleRepository: IStyleRepository,
        id: string) {
        super(dispatcher, styleRepository, id);

        this._workView = new ImageWorkView("Image " + this.id);
        this._workView.on(EVENT_SELECTED, () => this.onSelect());
        this._workView.on(EVENT_COPIED, () => this.onCopy());
        this._workView.on(EVENT_PASTED, () => this.onPaste());
        this._workView.on(EVENT_DELETED, () => this.onDelete());
        this._workView.on(EVENT_EDITED, () => this.onEdit());
        this.initWorkView();

        this.src = defaultSrc;
    }

    public getTypeId(): ElementsTypes {
        return ElementsTypes.image;
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
        const renderView = new ImageRenderView();

        renderView.updateChildren(this.children.map((childElement: IElement) => childElement.getRenderView()));
        renderView.applyStyles(this.styleRepository, this.styles);
        renderView.src = this.src;

        return renderView;
    }

    public getDefaultStyles(): IStylesWrapper {
        return defaultStyles;
    }

    public get src(): string {
        return this._src;
    }

    public set src(value: string) {
        this._src = value;
        this._workView.src = value;
    }
}
