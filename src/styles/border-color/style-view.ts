import { ColorStyleView } from "../base";

const title: string = "Border color";

export class BorderColorStyleView extends ColorStyleView {
    public getTitle(): string {
        return title;
    }
}