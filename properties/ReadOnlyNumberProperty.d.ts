import NumberProperty from "./NumberProperty.js";
import ReadOnlyBooleanProperty from "./BooleanProperty.js";
import StringProperty from "./StringProperty.js";
import Property from "../Property.js";
export default class ReadOnlyNumberProperty extends Property<number> {
    value: number;
    divide(property: NumberProperty): NumberProperty;
    subtract(property: NumberProperty): NumberProperty;
    add(property: NumberProperty): NumberProperty;
    multiply(property: NumberProperty): NumberProperty;
    greaterThan(property: NumberProperty): ReadOnlyBooleanProperty;
    lowerThan(property: NumberProperty): ReadOnlyBooleanProperty;
    toString(): StringProperty;
}
