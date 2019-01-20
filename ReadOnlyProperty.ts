import PropertyBase from "./PropertyBase.js";

export default class ReadOnlyProperty<T> extends PropertyBase<T> {

    public get value () {
        return this.$get();
    }

    public set value ( value: T ) {
        throw new Error( "Readonly" );
    }
}