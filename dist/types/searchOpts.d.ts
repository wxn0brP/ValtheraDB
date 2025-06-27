import { Arg } from "./arg.js";
export type LogicalOperators = {
    $and?: Array<SearchOptions>;
    $or?: Array<SearchOptions>;
    $not?: SearchOptions;
};
export type ComparisonOperators = {
    $gt?: Record<string, number>;
    $lt?: Record<string, number>;
    $gte?: Record<string, number>;
    $lte?: Record<string, number>;
    $in?: Record<string, any[]>;
    $nin?: Record<string, any[]>;
    $between?: Record<string, [number, number]>;
};
export type TypeAndExistenceOperators = {
    $exists?: Record<string, boolean>;
    $type?: Record<string, string>;
};
export type ArrayOperators = {
    $arrinc?: Record<string, any[]>;
    $arrincall?: Record<string, any[]>;
    $size?: Record<string, number>;
};
export type StringOperators = {
    $regex?: Record<string, RegExp>;
    $startsWith?: Record<string, string>;
    $endsWith?: Record<string, string>;
};
export type OtherOperators = {
    $subset?: Record<string, any>;
};
export type PredefinedSearchOperators = LogicalOperators & ComparisonOperators & TypeAndExistenceOperators & ArrayOperators & StringOperators & OtherOperators;
export type SearchOptions = PredefinedSearchOperators & Arg;
