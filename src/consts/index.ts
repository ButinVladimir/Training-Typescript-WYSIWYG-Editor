export enum ElementsTypes {
    container,
    row,
    column
};

export enum StylesTypes {
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    backgroundColor,
    borderColor,
    borderStyle,
    borderWidth,
    alignItems,
    justifyContent,
    flexGrow,
    width,
    height,
};

export const EVENT_SELECTED = "selected";
export const EVENT_DESELECTED = "deselected";
export const EVENT_ADDED = "added";
export const EVENT_STYLE_UPDATED = "style_updated";
export const EVENT_WORK = "work";
export const EVENT_PREVIEW = "preview";
export const EVENT_COPIED = "copy";
export const EVENT_PASTED = "paste";
export const EVENT_DELETED = "delete";
export const EVENT_EDITED = "edit";
export const EVENT_UPDATED = "update";