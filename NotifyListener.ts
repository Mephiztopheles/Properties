import ChangeListener from "./ChangeListener.js";
import PropertyBase from "./PropertyBase.js";

export default class NotifyListener<T> implements ChangeListener<T> {

    constructor ( private property: PropertyBase<T> ) {
    }

    changed ( observable: PropertyBase<T>, newValue: T, oldValue: T ) {
        this.property.notify( newValue, oldValue );
    }
}