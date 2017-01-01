import { SelectStyleView } from "../base";

const title: string = "Font style";

export class FontStyleStyleView extends SelectStyleView {
    public getTitle(): string {
        return title;
    }
}