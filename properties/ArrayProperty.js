import Property from "../Property.js";
function toJSON(object) {
    const cache = [];
    return JSON.stringify(object, function (key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // Duplicate reference found
                try {
                    // If this value does not reference a parent it can be deduped
                    return JSON.parse(JSON.stringify(value));
                }
                catch (error) {
                    // discard key if value cannot be deduped
                    return;
                }
            }
            // Store value in our collection
            cache.push(value);
        }
        return value;
    });
}
export default class ArrayProperty extends Property {
    constructor(value, interceptor) {
        if (!Array.isArray(value))
            value = [];
        super(value, interceptor);
    }
    get(index) {
        return this.$value[index];
    }
    get value() {
        if (this.interceptor == null)
            return this.$value;
        return this.interceptor.intercept(this.$value);
    }
    get length() {
        return this.$value.length;
    }
    set value(value) {
        if (value == null)
            value = [];
        if (toJSON(this.$value) != toJSON(value)) {
            const oldValue = this.$value.slice();
            this.$value = value.slice();
            this.notify(value, oldValue);
        }
    }
    push(...items) {
        if (items.length == 0)
            return this.$value.length;
        const oldValue = this.$value.slice();
        let length = this.$value.push.apply(this.$value, items);
        this.notify(this.$value, oldValue);
        return length;
    }
    splice(start, deleteCount, ...items) {
        const oldValue = this.$value.slice();
        let deleted = this.$value.splice.apply(this.$value, arguments);
        if (deleted.length !== 0 || items.length !== 0)
            this.notify(this.$value, oldValue);
        return deleted;
    }
    slice(start, end) {
        return this.$value.slice(start, end);
    }
    sort(compareFn) {
        const oldValue = this.$value.slice();
        this.$value.sort(compareFn);
        if (this.$value.length != oldValue.length)
            this.notify(this.$value, oldValue);
        return this;
    }
    indexOf(searchElement, fromIndex) {
        return this.$value.indexOf(searchElement, fromIndex);
    }
    forEach(callbackfn, thisArg) {
        this.$value.forEach(callbackfn, thisArg);
    }
    filter(callback, thisArg) {
        return this.$value.filter(callback, thisArg);
    }
    find(callback, thisArg) {
        for (let index = 0; index < this.$value.length; index++)
            if (callback.call(thisArg, this.$value[index], index, this.$value))
                return this.$value[index];
        return null;
    }
    pop() {
        const oldValue = this.$value.slice();
        let element = this.$value.pop();
        if (this.$value.length != oldValue.length)
            this.notify(this.$value, oldValue);
        return element;
    }
}
//# sourceMappingURL=ArrayProperty.js.map