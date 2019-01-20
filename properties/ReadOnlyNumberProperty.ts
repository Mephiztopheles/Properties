import NumberProperty                            from "./NumberProperty.js";
import ReadOnlyBooleanProperty                   from "./BooleanProperty.js";
import BooleanProperty, { ToBooleanInterceptor } from "./BooleanProperty.js";
import StringProperty                            from "./StringProperty.js";
import Property                                  from "../Property.js";
import Interceptor                               from "../Interceptor.js";
import PropertyBase                              from "../PropertyBase.js";

export default class ReadOnlyNumberProperty extends Property<number> {

    public get value (): number {
        return this.$get();
    }

    public set value ( value: number ) {
        this.$set( value );
    }

    public divide ( property: NumberProperty ): NumberProperty {
        return this.intercept( new DivideInterceptor( property ), property );
    }

    public subtract ( property: NumberProperty ): NumberProperty {
        return this.intercept( new SubtractInterceptor( property ), property );
    }

    public add ( property: NumberProperty ): NumberProperty {
        return this.intercept( new AddInterceptor( property ), property );
    }

    public multiply ( property: NumberProperty ): NumberProperty {
        return this.intercept( new MultiplyInterceptor( property ), property );
    }

    public greaterThan ( property: NumberProperty ): ReadOnlyBooleanProperty {
        return BooleanProperty.toBoolean( this, new GreaterThanInterceptor( this, property ), property );
    }

    public lowerThan ( property: NumberProperty ): ReadOnlyBooleanProperty {
        return BooleanProperty.toBoolean( this, new LowerThanInterceptor( this, property ), property );
    }

    public toString (): StringProperty {

        const value = this.$value != null ? this.$value.toString() : "";

        const instance = new StringProperty( value );

        this.addListener( ( observable: PropertyBase<number>, newValue: number ) => {

            if ( newValue != null )
                return newValue.toString();
            return "";
        } );

        return instance;
    }
}


class AddInterceptor extends Interceptor<number> {

    intercept ( value: number ): number {

        if ( value == null || this.property.value == null )
            return null;

        return value + this.property.value;
    }
}

class SubtractInterceptor extends Interceptor<number> {

    intercept ( value: number ): number {

        if ( value == null || this.property.value == null )
            return null;

        return value - this.property.value;
    }
}

class MultiplyInterceptor extends Interceptor<number> {

    intercept ( value: number ): number {

        if ( value == null || this.property.value == null )
            return null;

        return value * this.property.value;
    }
}

class DivideInterceptor extends Interceptor<number> {

    intercept ( value: number ): number {

        if ( value == null || this.property.value == null )
            return null;

        return value / this.property.value;
    }
}

class GreaterThanInterceptor extends ToBooleanInterceptor<number> {

    intercept ( value: boolean ): boolean {
        return this.propertyToCheck.value > this.property.value;
    }
}

class LowerThanInterceptor extends ToBooleanInterceptor<number> {

    intercept ( value: boolean ): boolean {
        return this.propertyToCheck.value < this.property.value;
    }
}