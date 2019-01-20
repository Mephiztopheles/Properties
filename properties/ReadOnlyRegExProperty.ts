import Property from "../Property.js";

export default class ReadOnlyRegExProperty extends Property<RegExp> {

    public get value (): RegExp {
        return this.$get();
    }

    public set value ( value: RegExp ) {
        this.$set( value );
    }
}