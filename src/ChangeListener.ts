import Property from "./Property.js";

export default interface ChangeListener<T> {
    changed( observable:Property<T>, source?:Property<T> ):void
}