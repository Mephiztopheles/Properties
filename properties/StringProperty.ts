import ReadOnlyStringProperty from "./ReadOnlyStringProperty.js";

export default class StringProperty extends ReadOnlyStringProperty {

    public get value () {
        return this.$get();
    }

    public set value ( value: string ) {
        this.$set( value );
    }
}