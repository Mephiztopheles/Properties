import Property from "../Property.js";
import Interceptor from "../Interceptor.js";
import BooleanProperty, { ToBooleanInterceptor } from "./BooleanProperty.js";
export default class StringProperty extends Property {
    concat(suffix) {
        return this.intercept(new ConcatenationInterceptor(suffix), suffix);
    }
    matches(property) {
        return BooleanProperty.toBoolean(this, new MatchesInterceptor(this, property), property);
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
//# sourceMappingURL=StringProperty.js.map