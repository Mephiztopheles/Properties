import PropertyBase from "./PropertyBase.js";
export default class ReadOnlyProperty<T> extends PropertyBase<T> {
    value: T;
}
