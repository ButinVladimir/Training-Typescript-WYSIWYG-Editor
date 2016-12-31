import { ColorStyleView } from "../base";

const title: string = "Background color";

export class BackgroundColorStyleView extends ColorStyleView {
    public getTitle(): string {
        return title;
    }
}