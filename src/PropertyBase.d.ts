import Interceptor from "./Interceptor.js";
import ChangeListener from "./ChangeListener.js";
interface ChangeListenerLambda<T> {
    (observable: PropertyBase<T>, newValue: T, oldValue: T): void;
}
export default class PropertyBase<T> {
    protected id: number;
    protected $value: T;
    protected interceptor: Interceptor<T>;
    constructor(value?: T, interceptor?: Interceptor<T>);
    readonly isBound: boolean;
    value: T;
    bind(property: PropertyBase<T>): void;
    unbind(): void;
    addListener(listener: ChangeListener<T> | ChangeListenerLambda<T>): void;
    removeListener(listener: ChangeListener<T> | ChangeListenerLambda<T>): void;
    changed(observable: PropertyBase<T>): void;
    notify(newValue: T, oldValue: T): void;
    isNull(): PropertyBase<boolean>;
    isNotNull(): PropertyBase<boolean>;
    protected $set(value: T): void;
    protected $get(): T;
    protected intercept<R extends PropertyBase<T>>(interceptor: Interceptor<T>, property: PropertyBase<T>): R;
}
export {};
