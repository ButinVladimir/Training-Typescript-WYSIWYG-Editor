import { SelectStyleView } from "../base";

const title: string = "Font weight";

export class FontWeightStyleView extends SelectStyleView {
    public getTitle(): string {
        return title;
    }
}