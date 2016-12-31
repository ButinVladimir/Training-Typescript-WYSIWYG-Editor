import * as $ from "jquery";
import { IStyleView } from "./style-view";
import { StylesTypes } from "../../consts";


export interface IStyle {
    getView(): IStyleView;
    getViewValue(): string;
    validate(value: string): boolean;
    applyValue(value: string, $element: JQuery): void;
}

export abstract class BaseStyle implements IStyle {
    public abstract getView(): IStyleView;

    public getViewValue(): string {
        return this.getView().getValue();
    }

    public abstract validate(value: string): boolean;

    public applyValue(value: string, $element: JQuery): void {
        if (this.validate(value)) {
            $element.css(this.getCssStyle(), value);
        }
    }

    protected abstract getCssStyle(): string;
}

const sizeRegexp: RegExp = /^(-?(0|\d+(%|px|em|vm|vh))|auto)$/;

export abstract class BaseSizeStyle extends BaseStyle {
    public validate(value: string): boolean {
        return sizeRegexp.test(value);
    }
}

const flexRegexp: RegExp = /^\d*(\.\d+)?$/;

export abstract class BaseFlexStyle extends BaseStyle {
    public validate(value: string): boolean {
        return flexRegexp.test(value);
    }
}

const colorRegexp: RegExp = /^.*$/;

export abstract class BaseColorStyle extends BaseStyle {
    public validate(value: string): boolean {
        return colorRegexp.test(value);
    }
}

export abstract class BaseSelectStyle extends BaseStyle {
    public validate(value: string): boolean {
        return this.getOptions().some((option: string) => option === value);
    }

    protected abstract getOptions(): string[];
}