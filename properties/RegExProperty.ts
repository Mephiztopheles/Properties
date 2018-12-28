import Property from "../Property.js";

export default class RegExProperty extends Property<RegExp> {

    public get value() {
        return this.$value;
    }

    public set value( value:any ) {

        if ( value instanceof RegExp )
            super.value = value;
        else
            super.value = new RegExp( value );
    }
}