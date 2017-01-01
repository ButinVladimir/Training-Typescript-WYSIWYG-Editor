import { ElementsTypes } from "../../consts";
import { IUpdater } from "../../updaters/base";

export interface IUpdaterRepository {
    get(type: ElementsTypes): IUpdater;
    set(type: ElementsTypes, updater: IUpdater): void;
}

export class UpdaterRepository implements IUpdaterRepository {
    private _updaterMapping: any;

    constructor() {
        this._updaterMapping = {};
    }

    public get(type: ElementsTypes): IUpdater {
        if (!(type in this._updaterMapping)) {
            throw new Error("Invalid element updater type - " + type);
        }

        return this._updaterMapping[type];
    }

    public set(type: ElementsTypes, updater: IUpdater): void {
        this._updaterMapping[type] = updater;
    }
}
