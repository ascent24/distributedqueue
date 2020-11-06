import { IStorageHandler } from "./IStorageHandler";
export declare class MemoryStorage implements IStorageHandler {
    private storage;
    initializeStorage(name: string, connObject?: null): Promise<boolean>;
    /**
     * @returns Peek first element from Queue. Does not remove the element
     */
    peekElement(): Promise<any>;
    /**
     *
     * @param value push to last element to Queue. and return new size of queue
     * @returns return new size of queue
     */
    pushElement(value: any): Promise<number>;
    /**
     * @returns pops first element from Queue. remove the element from queue and return it.
     */
    popElement(): Promise<any>;
    /**
     * @returns get the length of queue
     */
    length(): Promise<number>;
}
