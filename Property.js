import ReadOnlyProperty from "./ReadOnlyProperty.js";
export default class Property extends ReadOnlyProperty {
    get value() {
        return this.$get();
    }
    set value(value) {
        this.$set(value);
    }
}
//# sourceMappingURL=Property.js.map