import Interceptor from "../Interceptor.js";
import BooleanProperty, { ToBooleanInterceptor } from "./BooleanProperty.js";
import ReadOnlyProperty from "../ReadOnlyProperty.js";
export default class ReadOnlyStringProperty extends ReadOnlyProperty {
    get value() {
        return this.$get();
    }
    set value(value) {
        this.$set(value);
    }
    concat(suffix) {
        return this.intercept(new ConcatenationInterceptor(suffix), suffix);
    }
    matches(property) {
        return BooleanProperty.toBoolean(this, new MatchesInterceptor(this, property), property);
    }
    isEmpty() {
        return BooleanProperty.toBoolean(this, new IsEmptyInterceptor(this, this), null);
    }
    isNotEmpty() {
        return this.isEmpty().not();
    }
}
class ConcatenationInterceptor extends Interceptor {
    intercept(value) {
        return (value == null ? "" : value) + (this.property.value == null ? "" : this.property.value);
    }
}
class MatchesInterceptor extends ToBooleanInterceptor {
    intercept(value) {
        return this.propertyToCheck.value.match(this.property.value) != null;
    }
}
class IsEmptyInterceptor extends ToBooleanInterceptor {
    intercept(value) {
        return this.propertyToCheck.value == null || this.propertyToCheck.value == "";
    }
}
//# sourceMappingURL=ReadOnlyStringProperty.js.map