import PropertyBase from "./PropertyBase.js";
export default interface ChangeListener<T> {
    changed(observable: PropertyBase<T>, newValue: T, oldValue: T): void;
}
