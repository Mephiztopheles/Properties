import ChangeListener   from "./ChangeListener.js";
import ReadOnlyProperty from "./ReadOnlyProperty.js";

export default class Property<T> extends ReadOnlyProperty<T> implements ChangeListener<T> {

    public get value (): T {
        return this.$get();
    }

    public set value ( value: T ) {
        this.$set( value );
    }
}