export class ChangeListenerLambdaAdapter {
    constructor(method) {
        this.method = method;
    }
    changed(observable, newValue, oldValue) {
        this.method(observable, newValue, oldValue);
    }
}
//# sourceMappingURL=ChangeListener.js.map