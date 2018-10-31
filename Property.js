export default class Property {
    constructor(value, interceptor) {
        this.listener = [];
        this.value = value;
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
    get isBound() {
        return this.bound != null;
    }
    bind(property) {
        this.bound = property;
        this.value = this.bound.value;
        this.bound.addListener(this);
    }
    unbind() {
        if (!this.isBound)
            return;
        this.bound.removeListener(this);
        this.bound = null;
    }
    addListener(listener) {
        this.listener.push(listener);
    }
    removeListener(listener) {
        let index = this.listener.indexOf(listener);
        if (~index)
            this.listener.splice(index, 1);
    }
    changed(observable) {
        this.value = observable.value;
    }
    notify(newValue, oldValue) {
        this.listener.forEach(listener => {
            if (typeof listener === "function")
                listener(this, newValue, oldValue);
            if (listener.hasOwnProperty("changed"))
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