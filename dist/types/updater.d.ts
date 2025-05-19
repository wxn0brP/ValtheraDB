export type ArrayUpdater = {
    $push?: any;
    $pushset?: any;
    $pull?: any;
    $pullall?: any;
};
export type ObjectUpdater = {
    $merge?: any;
};
export type ValueUpdater = {
    $set?: any;
    $inc?: any;
    $dec?: any;
    $unset?: any;
    $rename?: any;
};
export type UpdaterArg = ArrayUpdater & ObjectUpdater & ValueUpdater & {
    [key: string]: any;
};
