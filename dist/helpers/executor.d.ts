interface Task {
    func: Function;
    param: any[];
    resolve: Function;
    reject: Function;
}
/**
 * A simple executor for queuing and executing asynchronous operations sequentially.
 * @class
 */
declare class executorC {
    quote: Task[];
    isExecuting: boolean;
    /**
     * Create a new executor instance.
     * @constructor
     */
    constructor();
    /**
     * Add an asynchronous operation to the execution queue.
     */
    addOp(func: Function, ...param: any[]): Promise<unknown>;
    /**
     * Execute the queued asynchronous operations sequentially.
     */
    execute(): Promise<void>;
}
export default executorC;
