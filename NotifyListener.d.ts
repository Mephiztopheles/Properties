import ChangeListener from "./ChangeListener.js";
import PropertyBase from "./PropertyBase.js";

export declare class NotifyListener<T> implements ChangeListener<T> {
    private property;
    constructor(property: PropertyBase<T>);
    changed ( observable: PropertyBase<T>, newValue: T, oldValue: T ): void
}
export {};