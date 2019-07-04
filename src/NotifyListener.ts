import ChangeListener from "./ChangeListener.js";
import PropertyBase from "./PropertyBase.js";

export default class NotifyListener<T> implements ChangeListener<T> {

    constructor ( private property: PropertyBase<T> ) {
    }

    changed ( newValue: T, oldValue: T, observable: PropertyBase<T> ) {
        this.property.notify( newValue, oldValue );
    }
}