export interface IStorageHandler {
    initializeStorage(Name: string, ConnObject?: any): Promise<boolean>;
    peekElement(): Promise<any>;
    pushElement(value: any): Promise<number>;
    popElement(): Promise<any>;
    length(): Promise<number>;
}
