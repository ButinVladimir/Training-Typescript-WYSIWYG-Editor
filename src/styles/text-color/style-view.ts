import { ColorStyleView } from "../base";

const title: string = "Text color";

export class TextColorStyleView extends ColorStyleView {
    public getTitle(): string {
        return title;
    }
}