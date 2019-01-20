import ReadOnlyRegExProperty from "./ReadOnlyRegExProperty.js";

export default class RegExProperty extends ReadOnlyRegExProperty {

    public get value () {
        return this.$get();
    }

    public set value ( value: any ) {
        this.$set( value );
    }
}