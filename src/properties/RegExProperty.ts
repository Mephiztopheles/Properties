import Property from "../Property.js";

export default class RegExProperty extends Property<RegExp> {

    public set value( value:any ) {

        if ( value instanceof RegExp )
            this.$value = value;
        else
            this.$value = new RegExp( value );
    }

    public get value() {
        return this.$value;
    }
}