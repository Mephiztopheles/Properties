let id = 0;
const bindings = new WeakMap();
const listeners = new WeakMap();
export default class Property {
    constructor(value, interceptor) {
        this.id = id++;
        listeners.set(this, []);
        this.$value = value;
        this.interceptor = interceptor;
    }
    get value() {
        if (this.interceptor == null)
            return this.$value;
        return this.interceptor.intercept(this.$value);
    }
    set value(value) {
        if (this.$value != value) {
            const oldValue = this.$value;
            this.$value = value;
            this.notify(value, oldValue);
        }
    }
    toString() {
        const value = this.value;
        return value == null ? "null" : value.toString();
    }
    get isBound() {
        return bindings.get(this) != null;
    }
    bind(property) {
        if (this === property)
            return;
        this.unbind();
        bindings.set(this, property);
        this.value = property.value;
        property.addListener(this);
    }
    unbind() {
        if (!this.isBound)
            return;
        bindings.get(this).removeListener(this);
        bindings.delete(this);
    }
    addListener(listener) {
        listeners.get(this).push(listener);
    }
    removeListener(listener) {
        let l = listeners.get(this);
        let index = l.indexOf(listener);
        if (~index)
            l.splice(index, 1);
    }
    changed(observable) {
        this.value = observable.value;
    }
    notify(newValue, oldValue) {
        listeners.get(this).forEach(listener => {
            if (typeof listener === "function")
                listener(this, newValue, oldValue);
            else
                listener.changed(this, newValue, oldValue);
        });
    }
    intercept(interceptor, property) {
        const instance = new this.constructor(this.$value, interceptor);
        instance.bind(this);
        property.addListener(new NotifyListener(instance));
        return instance;
    }
}
export class NotifyListener {
    constructor(property) {
        this.property = property;
    }
    changed(observable, newValue, oldValue) {
        this.property.notify(newValue, oldValue);
    }
}
//# sourceMappingURL=Property.js.map