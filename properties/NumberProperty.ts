import ReadOnlyNumberProperty from "./ReadOnlyNumberProperty.js";

export default class NumberProperty extends ReadOnlyNumberProperty {

    public get value () {
        return this.$get();
    }

    public set value ( value: number ) {
        this.$set( value );
    }
}