import ReadOnlyObjectProperty from "./ReadOnlyObjectProperty.js";

export default class ObjectProperty<T> extends ReadOnlyObjectProperty<T> {

    public get value() {
        return this.$get();
    }

    public set value(value: T) {
        this.$set(value);
    }
}