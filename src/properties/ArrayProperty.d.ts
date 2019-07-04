import Property from "../Property.js";
import Interceptor from "src/Interceptor.js";
export default class ArrayProperty<T> extends Property<T[]> {
    constructor(value?: T[], interceptor?: Interceptor<T[]>);
    value: T[];
    readonly length: number;
    get(index: number): T | undefined;
    push(...items: T[]): number;
    splice(start: number, deleteCount?: number, ...items: T[]): T[];
    slice(start?: number, end?: number): T[];
    sort(compareFn?: (a: T, b: T) => number): this;
    indexOf(searchElement: T, fromIndex?: number): number;
    forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
    filter(callback: (value: T, index: number, array: T[]) => any, thisArg?: any): T[];
    find(callback: (value: T, index: number, array: T[]) => boolean, thisArg?: any): T;
    pop(): T | undefined;
}
