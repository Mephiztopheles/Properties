import Property from "../Property.js";
export default class RegExProperty extends Property {
    get value() {
        return this.$value;
    }
    set value(value) {
        if (value instanceof RegExp)
            this.$value = value;
        else
            this.$value = new RegExp(value);
    }
}
//# sourceMappingURL=RegExProperty.js.map