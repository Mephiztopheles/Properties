import ChangeListener from "./ChangeListener.js";
import ReadOnlyProperty from "./ReadOnlyProperty.js";
export default class Property<T> extends ReadOnlyProperty<T> implements ChangeListener<T> {
    value: T;
}
