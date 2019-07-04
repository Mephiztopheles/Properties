import PropertyBase from "./PropertyBase.js";
export default abstract class Interceptor<T> {
    protected property: PropertyBase<any>;
    constructor(property: PropertyBase<any>);
    abstract intercept(value: T): any;
}
