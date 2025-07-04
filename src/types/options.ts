import dbActionC from "../actions/action";
import executorC from "../helpers/executor";

export interface DbOpts {
    maxFileSize?: number;
    dbAction?: dbActionC;
    executor?: executorC;
}

export interface DbFindOpts {
    reverse?: boolean;
    max?: number;
    offset?: number;
    sortBy?: string;
    sortAsc?: boolean;
}

export interface FindOpts {
    select?: string[];
    exclude?: string[];
    transform?: Function;
}