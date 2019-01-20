import Interceptor from "../Interceptor.js";
import ReadOnlyProperty from "../ReadOnlyProperty.js";
export default class ReadOnlyBooleanProperty extends ReadOnlyProperty {
    get value() {
        return this.$get();
    }
    set value(value) {
        this.$set(value);
    }
    and(property) {
        return this.intercept(new AndInterceptor(property), property);
    }
    or(property) {
        return this.intercept(new OrInterceptor(property), property);
    }
    not() {
        return this.intercept(new NotInterceptor(this), this);
    }
}
class AndInterceptor extends Interceptor {
    intercept(value) {
        return value && this.property.value;
    }
}
class OrInterceptor extends Interceptor {
    intercept(value) {
        return value || this.property.value;
    }
}
class NotInterceptor extends Interceptor {
    intercept(value) {
        return !this.property.value;
    }
}
//# sourceMappingURL=ReadOnlyBooleanProperty.js.map