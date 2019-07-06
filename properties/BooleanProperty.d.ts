import ReadOnlyBooleanProperty from "./ReadOnlyBooleanProperty.js";
import Property from "../Property.js";
import Interceptor from "../Interceptor.js";
export default class BooleanProperty extends ReadOnlyBooleanProperty {
    value: boolean;
    static toBoolean(assignment: Property<any>, interceptor: Interceptor<boolean>, property: Property<any>): ReadOnlyBooleanProperty;
}
export declare abstract class ToBooleanInterceptor<T> extends Interceptor<boolean> {
    protected propertyToCheck: Property<T>;
    constructor(propertyToCheck: Property<T>, property: Property<any>);
}
