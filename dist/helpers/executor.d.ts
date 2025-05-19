interface Task {
    func: Function;
    param: any[];
    resolve: Function;
    reject: Function;
}
declare class executorC {
    quote: Task[];
    isExecuting: boolean;
    constructor();
    addOp(func: Function, ...param: any[]): Promise<unknown>;
    execute(): Promise<void>;
}
export default executorC;
