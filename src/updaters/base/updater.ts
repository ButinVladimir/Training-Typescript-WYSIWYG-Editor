import { IElement } from "../../elements/base";
import { IUpdaterView } from "./updater-view";

export interface IUpdater {
    getView(): IUpdaterView;
    getElementValues(element: IElement): void;
    setElementValues(element: IElement): void;
}
