import ReadOnlyRegExProperty from "./ReadOnlyRegExProperty.js";
export default class RegExProperty extends ReadOnlyRegExProperty {
    get value() {
        return this.$get();
    }
    set value(value) {
        this.$set(value);
    }
}
//# sourceMappingURL=RegExProperty.js.map