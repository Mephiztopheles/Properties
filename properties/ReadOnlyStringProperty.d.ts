import Property from "../Property.js";
import ReadOnlyBooleanProperty from "./BooleanProperty.js";
import RegExProperty from "./RegExProperty.js";
import ReadOnlyProperty from "../ReadOnlyProperty.js";
export default class ReadOnlyStringProperty extends ReadOnlyProperty<string> {
    value: string;
    concat(suffix: Property<any>): ReadOnlyStringProperty;
    matches(property: RegExProperty): ReadOnlyBooleanProperty;
    isEmpty(): ReadOnlyBooleanProperty;
    isNotEmpty(): ReadOnlyBooleanProperty;
}
