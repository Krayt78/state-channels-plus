import { StateSnapshotStruct } from "@typechain-types/contracts/V1/DataTypes";
import { AgnosticStorage } from "./AgnosticStorage";

/**
 * StateSnapshotStorage provides persistent storage for state snapshots
 * organized by fork count and block height.
 */
export class StateSnapshotStorage {
    private storage: AgnosticStorage<StateSnapshotStruct>;

    constructor(options: { persist?: boolean } = {}) {
        this.storage = new AgnosticStorage<StateSnapshotStruct>({
            persist: options.persist ?? false,
            storeName: "state-snapshots"
        });
    }
}
