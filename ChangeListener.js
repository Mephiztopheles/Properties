export class ChangeListenerLambdaAdapter {
    constructor(method) {
        this.method = method;
    }
    changed(observable, source) {
        this.method(observable, source);
    }
}
//# sourceMappingURL=ChangeListener.js.map