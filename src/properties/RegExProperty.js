import Property from "../Property.js";
export default class RegExProperty extends Property {
    set value(value) {
        if (value instanceof RegExp)
            this.$value = value;
        else
            this.$value = new RegExp(value);
    }
    get value() {
        return this.$value;
    }
}
//# sourceMappingURL=RegExProperty.js.map