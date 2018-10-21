import Property from "../Property.js";
import Interceptor from "../Interceptor.js";
import BooleanProperty, { ToBooleanInterceptor } from "./BooleanProperty.js";
export default class NumberProperty extends Property {
    divide(property) {
        return this.intercept(new DivideInterceptor(property), property);
    }
    subtract(property) {
        return this.intercept(new SubtractInterceptor(property), property);
    }
    add(property) {
        return this.intercept(new AddInterceptor(property), property);
    }
    multiply(property) {
        return this.intercept(new MultiplyInterceptor(property), property);
    }
    greaterThan(property) {
        return BooleanProperty.toBoolean(this, new GreaterThanInterceptor(this, property), property);
    }
    lowerThan(property) {
        return BooleanProperty.toBoolean(this, new LowerThanInterceptor(this, property), property);
    }
}
class AddInterceptor extends Interceptor {
    intercept(value) {
        if (value == null || this.property.value == null)
            return null;
        return value + this.property.value;
    }
}
class SubtractInterceptor extends Interceptor {
    intercept(value) {
        if (value == null || this.property.value == null)
            return null;
        return value - this.property.value;
    }
}
class MultiplyInterceptor extends Interceptor {
    intercept(value) {
        if (value == null || this.property.value == null)
            return null;
        return value * this.property.value;
    }
}
class DivideInterceptor extends Interceptor {
    intercept(value) {
        if (value == null || this.property.value == null)
            return null;
        return value / this.property.value;
    }
}
class GreaterThanInterceptor extends ToBooleanInterceptor {
    intercept(value) {
        return this.propertyToCheck.value > this.property.value;
    }
}
class LowerThanInterceptor extends ToBooleanInterceptor {
    intercept(value) {
        return this.propertyToCheck.value < this.property.value;
    }
}
//# sourceMappingURL=NumberProperty.js.map