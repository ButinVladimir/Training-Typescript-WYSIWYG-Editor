import { SelectStyleView } from "../base";

const title: string = "Border style";

export class BorderStyleStyleView extends SelectStyleView {
    public getTitle(): string {
        return title;
    }
}