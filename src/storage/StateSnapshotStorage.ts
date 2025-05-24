import { StateSnapshotStruct } from "@typechain-types/contracts/V1/DataTypes";
import { AgnosticStorage } from "./AgnosticStorage";

/**
 * StateSnapshotStorage provides persistent storage for state snapshots
 * organized by fork count and block height.
 */
export class StateSnapshotStorage {
    private storage: AgnosticStorage<StateSnapshotStruct>;

    // In-memory index for [fork count, block height] pairs
    // This allows quick access to snapshots without querying the storage
    private forkIndex: Map<number, Set<number>> = new Map();

    constructor(options: { persist?: boolean } = {}) {
        this.storage = new AgnosticStorage<StateSnapshotStruct>({
            persist: options.persist ?? false,
            storeName: "state-snapshots"
        });
    }

    /**
     * Initialize the storage and rebuild the fork index
     */
    async initialize(): Promise<void> {
        await this.storage.initialize();

        // Rebuild the fork index from stored data
        const keys = await this.storage.keys();
        for (const key of keys) {
            const [forkCnt, blockHeight] = this.parseKey(key);
            if (forkCnt !== undefined && blockHeight !== undefined) {
                this.addToIndex(forkCnt, blockHeight);
            }
        }

        console.log(
            `Initialized StateSnapshotStorage with ${keys.length} snapshots`
        );
    }

    /**
     * Store a state snapshot
     */
    async store(
        forkCnt: number,
        blockHeight: number,
        snapshot: StateSnapshotStruct,
        options: { wait?: boolean } = {}
    ): Promise<void> {
        const key = this.makeKey(forkCnt, blockHeight);
        await this.storage.set(key, snapshot, options);
        this.addToIndex(forkCnt, blockHeight);

        console.log(
            `Stored snapshot for fork ${forkCnt}, height ${blockHeight}`
        );
    }

    /**
     * Retrieve a state snapshot
     */
    async get(
        forkCnt: number,
        blockHeight: number
    ): Promise<StateSnapshotStruct | null> {
        const key = this.makeKey(forkCnt, blockHeight);
        return await this.storage.get(key);
    }

    // Helper methods

    private makeKey(forkCnt: number, blockHeight: number): string {
        return `${forkCnt}-${blockHeight}`;
    }

    private parseKey(key: string): [number | undefined, number | undefined] {
        const parts = key.split("-");
        if (parts.length !== 2) {
            return [undefined, undefined];
        }

        const forkCnt = parseInt(parts[0], 10);
        const blockHeight = parseInt(parts[1], 10);

        if (isNaN(forkCnt) || isNaN(blockHeight)) {
            return [undefined, undefined];
        }

        return [forkCnt, blockHeight];
    }

    private addToIndex(forkCnt: number, blockHeight: number): void {
        if (!this.forkIndex.has(forkCnt)) {
            this.forkIndex.set(forkCnt, new Set());
        }
        this.forkIndex.get(forkCnt)!.add(blockHeight);
    }
}
