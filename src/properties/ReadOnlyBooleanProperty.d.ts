import ReadOnlyProperty from "../ReadOnlyProperty.js";
export default class ReadOnlyBooleanProperty extends ReadOnlyProperty<boolean> {
    value: boolean;
    and(property: ReadOnlyBooleanProperty): ReadOnlyBooleanProperty;
    or(property: ReadOnlyBooleanProperty): ReadOnlyBooleanProperty;
    not(): ReadOnlyBooleanProperty;
}
