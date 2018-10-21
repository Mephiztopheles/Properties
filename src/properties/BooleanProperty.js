import Property from "../Property.js";
import Interceptor from "../Interceptor.js";
export default class BooleanProperty extends Property {
    and(property) {
        return this.intercept(new AndInterceptor(property), property);
    }
    or(property) {
        return this.intercept(new OrInterceptor(property), property);
    }
    not() {
        return this.intercept(new NotInterceptor(this), this);
    }
    static toBoolean(assignment, interceptor, property) {
        const instance = new BooleanProperty(null, interceptor);
        let toBooleanListener = new ToBooleanListener(instance);
        assignment.addListener(toBooleanListener);
        property.addListener(toBooleanListener);
        return instance;
    }
}
export class ToBooleanInterceptor extends Interceptor {
    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor(propertyToCheck, property) {
        super(property);
        this.propertyToCheck = propertyToCheck;
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
class ToBooleanListener {
    constructor(instance) {
        this.instance = instance;
        this.value = instance.value;
    }
    changed(observable, source) {
        let value = this.instance.value;
        if (this.value != value) {
            this.value = value;
            this.instance.notify(source);
        }
    }
}
//# sourceMappingURL=BooleanProperty.js.map