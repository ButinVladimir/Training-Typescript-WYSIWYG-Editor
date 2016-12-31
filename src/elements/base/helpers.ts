import * as $ from "jquery";
import { IStylesWrapper } from "../base";
import { StylesTypes } from "../../consts";
import { IStyleRepository } from "../../storages/style-repository";

export function applyStylesArray(styleRepository: IStyleRepository, stylesWrapper: IStylesWrapper, $element: JQuery, stylesIds: StylesTypes[]): void {
    for (let i = 0; i < stylesIds.length; i++) {
        styleRepository.get(stylesIds[i]).applyValue(stylesWrapper.get(stylesIds[i]), $element);
    }
}