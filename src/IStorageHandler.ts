export interface IStorageHandler
{
  initializeStorage(Name: string,ConnObject?:any): Promise<boolean>;
  peekElement():Promise<any>; //Peek first element from Queue. Does not remove the element
  pushElement(value: any): Promise<number>; //push to last element to Queue. and return new size of queue 
  popElement(): Promise<any>;     //pops first element from Queue. remove the element from queue
  length(): Promise<number>; //get the length of queue
  flushStorage():Promise<boolean>
}
