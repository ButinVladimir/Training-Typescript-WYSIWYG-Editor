import { SelectStyleView } from "../base";

const title: string = "Text align";

export class TextAlignStyleView extends SelectStyleView {
    public getTitle(): string {
        return title;
    }
}