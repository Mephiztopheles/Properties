import PropertyBase from "./PropertyBase.js";

export default interface ChangeListener<T> {
    changed ( newValue: T, oldValue: T, observable: PropertyBase<T> ): void
}