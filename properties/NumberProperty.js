import ReadOnlyNumberProperty from "./ReadOnlyNumberProperty.js";
export default class NumberProperty extends ReadOnlyNumberProperty {
    get value() {
        return this.$get();
    }
    set value(value) {
        this.$set(value);
    }
}
//# sourceMappingURL=NumberProperty.js.map