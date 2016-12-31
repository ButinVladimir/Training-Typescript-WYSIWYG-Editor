import * as $ from "jquery";

export interface IStyleView {
    getTitle(): string;
    setValue(value: string): void;
    getValue(): string;
    render(): JQuery;
}

const inputTemplate = require("./input-template.html");

export abstract class InputStyleView implements IStyleView {
    protected $element: JQuery;

    constructor() {
        this.$element = $(inputTemplate);
        this.$element.children("label").text(this.getTitle());
    }

    public abstract getTitle(): string;

    public setValue(value: string): void {
        this.$element.children("input").val(value);
    }

    public getValue(): string {
        return this.$element.children("input").val();
    }

    public render(): JQuery {
        return this.$element;
    }
}

const selectTemplate = require("./select-template.html");

export abstract class SelectStyleView implements IStyleView {
    protected $element: JQuery;

    constructor(
        protected options: any) {
        this.$element = $(selectTemplate);
        this.$element.children("label").text(this.getTitle());

        const $select = this.$element.children("select");
        $.each(this.options, (key: string, value: string) => {
            $select.append($("<option>", {text: value, value: key}));
        });
    }

    public abstract getTitle(): string;

    public setValue(value: string): void {
        this.$element.children("select").val(value);
    }

    public getValue(): string {
        return this.$element.children("select").val();
    }

    public render(): JQuery {
        return this.$element;
    }
}

const colorTemplate = require("./color-template.html");

export abstract class ColorStyleView implements IStyleView {
    protected $element: JQuery;

    constructor() {
        this.$element = $(colorTemplate);
        this.$element.children("label").text(this.getTitle());
    }

    public abstract getTitle(): string;

    public setValue(value: string): void {
        this.$element.children("input").val(value);
    }

    public getValue(): string {
        return this.$element.children("input").val();
    }

    public render(): JQuery {
        return this.$element;
    }
}
