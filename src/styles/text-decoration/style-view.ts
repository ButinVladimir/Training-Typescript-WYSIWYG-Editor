import { SelectStyleView } from "../base";

const title: string = "Text decoration";

export class TextDecorationStyleView extends SelectStyleView {
    public getTitle(): string {
        return title;
    }
}