export default class Interceptor {
    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor(property) {
        this.property = property;
        if (this.property == null)
            throw new Error("Cannot divide with null");
    }
}
//# sourceMappingURL=Interceptor.js.map