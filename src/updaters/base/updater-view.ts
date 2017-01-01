import * as $ from "jquery";
import { EventEmitter } from "events";

export interface IUpdaterView {
    render(): JQuery;
}
