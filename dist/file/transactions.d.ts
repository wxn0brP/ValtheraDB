import { Transaction } from "../types/transactions.js";
declare function processTransactions(file: string, transactions: Transaction[]): Promise<void>;
export default processTransactions;
